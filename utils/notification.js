export default function notification(title, icon, body, tag = 'tag', duration = 3000) {
    if (window.Notification && window.Notification.permission === 'granted') {
        const n = new window.Notification(
            title,
            {
                icon,
                body,
                tag,
            },
        );
        n.onclick = function () {
            window.focus();
            this.close();
        };
        setTimeout(n.close.bind(n), duration);
    }
}
