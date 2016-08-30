import once from 'once-event-listener';
import ui from '../action/ui';

function mask(call) {
    ui.openMaskLayout();
    once(document.querySelector('#maskLayout'), 'click', () => {
        ui.closeMaskLayout();
        call();
    });
}

export default mask;
