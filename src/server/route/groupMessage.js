const fs = require('fs');
const path = require('path');
const promise = require('bluebird');

const User = require('../model/user');
const Group = require('../model/group');
const GroupMessage = require('../model/groupMessage');
const isLogin = require('../police/isLogin');
const qiniu = require('../util/qiniu');
const config = require('../../../config/config');

const GroupMessageRoute = {
    'POST /groupMessage': function* (socket, data, end) {
        yield* isLogin(socket, data, end);

        const user = yield User.findById(socket.user);
        const group = yield Group.findById(data.linkmanId);

        if (data.type === 'text') {
            data.content = data.content.slice(0, config.maxMessageLength);
            data.content = data.content
                .replace(/&/g, '&amp')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&apos;');
        }
        else if (data.type === 'image') {
            // if data.content is image data
            if (/^data:image/.test(data.content)) {
                const fileName = `message_${Date.now().toString()}.${data.content.match(/data:image\/(.+);base64/)[1]}`;
                const fileSavePath = path.join(__dirname, `../../../public/images/message/${fileName}`);

                // save to local disk
                yield promise.promisify(fs.writeFile)(
                    fileSavePath,
                    data.content.replace(/^data:image\/(.+);base64,/, ''),
                    'base64'
                );

                // if have qiniu config. push file to qiniu
                if (config.bucket === 'bucket_name' || config.accessKey === 'qiniu_access_key' || config.secretKey === 'qiniu_secret_key') {
                    data.content = `/images/message/${fileName}`;
                }
                else {
                    yield qiniu(fileName, fileSavePath);
                    fs.unlinkSync(fileSavePath);
                    data.content = `http://${config.bucketUrl}/${fileName}`;
                }
            }
        }

        const message = new GroupMessage({
            from: user,
            to: group,
            type: data.type,
            content: data.content,
        });

        let savedMessage = null;
        try {
            savedMessage = yield message.save();
            group.messages.push(savedMessage);
            yield group.save();
        }
        catch (err) {
            end(500, { msg: 'server error when save new message' });
        }

        socket.to(group._id.toString()).emit('groupMessage', savedMessage);

        end(201, savedMessage);
    },
};

module.exports = GroupMessageRoute;
