import { Toast } from 'native-base';

export default {
    success(message: string) {
        Toast.show({
            text: message,
            type: 'success',
            position: 'top',
        });
    },
    warning(message: string) {
        Toast.show({
            text: message,
            type: 'warning',
            position: 'top',
        });
    },
    danger(message: string) {
        Toast.show({
            text: message,
            type: 'danger',
            position: 'top',
        });
    },
};
