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

function play() {
    if (!isPlaying) {
        isPlaying = true;
        const playPromise = $audio.play();
        if (playPromise) {
            playPromise.then(() => {
                isPlaying = false;
            }).catch(() => {
                isPlaying = false;
                $audio.load();
                play();
            });
        }
    }
}

export default function sound(type = 'default') {
    if (type !== prevType) {
        $source.setAttribute('src', sounds[type]);
        $audio.load();
        prevType = type;
    }
    play();
}
