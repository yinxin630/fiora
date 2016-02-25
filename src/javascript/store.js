'use strict'

const Action = require('./action.js');
import { combineReducers, createStore } from 'redux';

function reducer(state = {}, action) {
    console.log(`state: ${state}`);
    console.log(`action: ${action}`);
    
    switch (action.type) {
        case Action.types.InitUserInfo: {
            return Object.assign({}, state, {user: action.user});
        }
        case Action.types.UpdateUserInfo: {
            state.user = action.user;
            return Object.assign({}, state);
        }
        default:
            return state;
    }
}
let reducers = combineReducers({ reducer });

module.exports = createStore(reducers);

// let unsubscribe = store.subscribe(() =>
//     console.log('store监控', store.getState())
// );