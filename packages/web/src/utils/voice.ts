import axios from 'axios';
import fetch from './fetch';

const $audio = document.createElement('audio');
const $source = document.createElement('source');
$audio.volume = 0.6;
$source.setAttribute('type', 'audio/mp3');
$source.setAttribute('src', '');
$audio.appendChild($source);
document.body.appendChild($audio);

let baiduToken = '';
async function read(text: string, cuid: string) {
    if (!baiduToken) {
        const [err, result] = await fetch('getBaiduToken');
        if (err) {
            return;
        }
        baiduToken = result.token;
    }

    const res = await axios.get(
        `https://tsn.baidu.com/text2audio?tex=${text}&tok=${baiduToken}&cuid=${cuid}&ctp=1&lan=zh&per=4`,
        { responseType: 'blob' },
    );
    const blob = res.data;
    if (res.status !== 200 || blob.type === 'application/json') {
        console.warn('合成语言失败');
    } else {
        $source.setAttribute('src', URL.createObjectURL(blob));
        $audio.load();

        try {
            const playEndPromise = new Promise((resolve) => {
                $audio.onended = resolve;
            });
            await $audio.play();
            // eslint-disable-next-line consistent-return
            return playEndPromise;
        } catch (err) {
            console.warn('语言朗读消息失败', err.message);
        }
    }
}

type Task = {
    text: string;
    cuid: string;
};

const taskQueue: Task[] = [];
let isWorking = false;
async function handleTaskQueue() {
    isWorking = true;
    const task = taskQueue.shift();
    if (task) {
        await read(task.text, task.cuid);
        await handleTaskQueue();
    } else {
        isWorking = false;
    }
}

const voice = {
    push(text: string, cuid: string) {
        taskQueue.push({ text, cuid });
        if (!isWorking) {
            handleTaskQueue();
        }
    },
};

export default voice;
