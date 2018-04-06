import store from './store';
import ActionTypes from './ActionTypes';

const { dispatch } = store;

export function setPrimaryColor() {
    dispatch({
        type: ActionTypes.SetPrimaryColor,
    });
}

export default {
    setPrimaryColor,
};
