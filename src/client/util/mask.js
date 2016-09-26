import once from 'once-event-listener';
import ui from '../action/pc';

function mask(call) {
    ui.openMaskLayout();
    once(document.getElementById('maskLayout'), 'click', () => {
        ui.closeMaskLayout();
        call();
    });
}

export default mask;
