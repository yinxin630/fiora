import axios from 'axios';
import fetch from './fetch';

const taskQueue = [];
let isWorking = false;
async function handleTaskQueue() {
    isWorking = true;
    const task = taskQueue.shift();
    if (task) {
        await voice.read(task.text, task.cuid);
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

            try {
                const playEndPromise = new Promise((resolve) => {
                    $audio.onended = resolve;
                });
                await $audio.play();
                return playEndPromise;
            } catch (err) {
                console.warn('语言朗读消息失败', err.message);
            }
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
$audio.volume = 0.6;
$source.setAttribute('type', 'audio/mp3');
$source.setAttribute('src', '');
$audio.appendChild($source);
document.body.appendChild($audio);

export default voice;

