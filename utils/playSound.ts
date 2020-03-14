type Sounds = {
    [key: string]: string;
}

const sounds: Sounds = {
    default: require('../client/assets/audios/default.mp3'),
    apple: require('../client/assets/audios/apple.mp3'),
    pcqq: require('../client/assets/audios/pcqq.mp3'),
    mobileqq: require('../client/assets/audios/mobileqq.mp3'),
    momo: require('../client/assets/audios/momo.mp3'),
    huaji: require('../client/assets/audios/huaji.mp3'),
};

let prevType = 'default';
const $audio = document.createElement('audio');
const $source = document.createElement('source');
$audio.volume = 0.6;
$source.setAttribute('type', 'audio/mp3');
$source.setAttribute('src', sounds[prevType]);
$audio.appendChild($source);
document.body.appendChild($audio);

let isPlaying = false;

async function play() {
    if (!isPlaying) {
        isPlaying = true;

        try {
            await $audio.play();
        } catch (err) {
            console.warn('播放新消息提示音失败', err.message);
        } finally {
            isPlaying = false;
        }
    }
}

export default function playSound(type = 'default') {
    if (type !== prevType) {
        $source.setAttribute('src', sounds[type]);
        $audio.load();
        prevType = type;
    }
    play();
}
