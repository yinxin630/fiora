import ui from '../action/ui';
import once from 'once-event-listener';

function mask (call) {
    ui.openMaskLayout();
    once(document.querySelector('#maskLayout'), 'click', () => {
        ui.closeMaskLayout();
        call();
    });
}

export default mask;