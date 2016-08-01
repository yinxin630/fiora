import { combineReducers, createStore } from 'redux';
import ui from './reducer/ui';

let reducers = combineReducers({ ui });
export default createStore(reducers);