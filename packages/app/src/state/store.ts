import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(
    // @ts-ignore
    reducer,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
