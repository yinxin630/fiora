import { combineReducers, createStore } from 'redux';
import ui from './reducer/ui';
import user from './reducer/user';

let reducers = combineReducers({ ui, user });
export default createStore(reducers);