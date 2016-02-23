'use strict'

import { Actions } from './action.js';
import { combineReducers, createStore } from 'redux';

function reducer(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}
let reducers = combineReducers({ reducer });

export const store = createStore(reducers);

// let unsubscribe = store.subscribe(() =>
//     console.log('store监控', store.getState())
// );