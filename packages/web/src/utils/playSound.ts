import DefaultSound from '@fiora/assets/audios/default.mp3';
import AppleSound from '@fiora/assets/audios/apple.mp3';
import PcQQSound from '@fiora/assets/audios/pcqq.mp3';
import MobileQQSound from '@fiora/assets/audios/mobileqq.mp3';
import MoMoSound from '@fiora/assets/audios/momo.mp3';
import HuaJiSound from '@fiora/assets/audios/huaji.mp3';

type Sounds = {
    [key: string]: string;
};

const sounds: Sounds = {
    default: DefaultSound,
    apple: AppleSound,
    pcqq: PcQQSound,
    mobileqq: MobileQQSound,
    momo: MoMoSound,
    huaji: HuaJiSound,
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
