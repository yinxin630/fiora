import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import pc from './reducer/pc';
import user from './reducer/user';

const reducers = combineReducers({ pc, user });
export default createStore(reducers);
