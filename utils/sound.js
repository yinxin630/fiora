const sounds = {
    default: require('@/assets/audios/default.mp3'),
    apple: require('@/assets/audios/apple.mp3'),
    pcqq: require('@/assets/audios/pcqq.mp3'),
    mobileqq: require('@/assets/audios/mobileqq.mp3'),
    momo: require('@/assets/audios/momo.mp3'),
    huaji: require('@/assets/audios/huaji.mp3'),
};

const $audio = document.createElement('audio');
const $source = document.createElement('source');
$source.setAttribute('type', 'audio/mp3');
$audio.appendChild($source);
document.body.appendChild($audio);

export default function sound(type = 'default') {
    $source.src = sounds[type];
    $audio.load();
    $audio.play();
}
