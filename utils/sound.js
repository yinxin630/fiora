const sounds = {
    default: require('@/assets/audios/default.mp3'),
    apple: require('@/assets/audios/apple.mp3'),
    pcqq: require('@/assets/audios/pcqq.mp3'),
    mobileqq: require('@/assets/audios/mobileqq.mp3'),
    momo: require('@/assets/audios/momo.mp3'),
    huaji: require('@/assets/audios/huaji.mp3'),
};

let prevType = 'default';
const $audio = document.createElement('audio');
const $source = document.createElement('source');
$source.setAttribute('type', 'audio/mp3');
$source.setAttribute('src', sounds[prevType]);
$audio.appendChild($source);
document.body.appendChild($audio);

let isPlaying = false;

export default function sound(type = 'default') {
    if (type !== prevType) {
        $source.setAttribute('src', sounds[type]);
        $audio.load();
        prevType = type;
    }
    if (!isPlaying) {
        isPlaying = true;
        $audio.play().then(() => {
            isPlaying = false;
        });
    }
}
