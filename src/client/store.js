import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import ui from './reducer/pc';
import user from './reducer/user';

const reducers = combineReducers({ ui, user });
export default createStore(reducers);
