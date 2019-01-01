import axios from 'axios';
import fetch from './fetch';
import sleep from './sleep';

const taskQueue = [];
let isWorking = false;
async function handleTaskQueue() {
    isWorking = true;
    const task = taskQueue.shift();
    if (task) {
        await voice.read(task.text, task.cuid);
        await sleep(200);
        await handleTaskQueue();
    } else {
        isWorking = false;
    }
}

let baiduToken = '';
const voice = {
    async read(text, cuid) {
        if (!baiduToken) {
            const [err, result] = await fetch('getBaiduToken');
            if (err) {
                return;
            }
            baiduToken = result.token;
        }

        const res = await axios.get(`https://tsn.baidu.com/text2audio?tex=${text}&tok=${baiduToken}&cuid=${cuid}&ctp=1&lan=zh&per=4`, { responseType: 'blob' });
        const blob = res.data;
        if (blob.type === 'application/json') {
            console.warn('合成语言失败');
        } else {
            $source.setAttribute('src', URL.createObjectURL(blob));
            $audio.load();
            const promise = new Promise((resolve) => {
                $audio.addEventListener('ended', resolve);
            });
            $audio.play();
            await promise;
        }
    },
    push(text, cuid) {
        taskQueue.push({ text, cuid });
        if (!isWorking) {
            handleTaskQueue();
        }
    },
};

const $audio = document.createElement('audio');
const $source = document.createElement('source');
$source.setAttribute('type', 'audio/mp3');
$source.setAttribute('src', '');
$audio.appendChild($source);
document.body.appendChild($audio);

export default voice;

