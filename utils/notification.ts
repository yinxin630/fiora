export default function notification(title, icon, body, tag = 'tag', duration = 3000) {
    if (Notification && Notification.permission === 'granted') {
        const n = new Notification(
            title,
            {
                icon,
                body,
                tag,
            },
        );
        n.onclick = function handleClick() {
            window.focus();
            this.close();
        };
        setTimeout(n.close.bind(n), duration);
    }
}
