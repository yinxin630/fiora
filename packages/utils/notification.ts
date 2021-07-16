export default function notification(title: string, icon: string, body: string, tag = 'tag', duration = 3000) {
    if (window.Notification && window.Notification.permission === 'granted') {
        const n = new window.Notification(
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
