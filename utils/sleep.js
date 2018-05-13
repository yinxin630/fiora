export default function sleep(duration = 200) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
