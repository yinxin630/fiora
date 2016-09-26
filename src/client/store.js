import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import pc from './reducer/pc';
import mobile from './reducer/mobile';
import user from './reducer/user';

const reducers = combineReducers({ pc, mobile, user });
export default createStore(reducers);
