'use strict'

const Action = require('./action.js');
import { combineReducers, createStore } from 'redux';

function reducer(state = {
        user: {
            avatar: 'http://chat.suisuijiang.com/images/head.png',
            nickname: '未登录',
        },
        linkmans: [],
    }, action) {
        switch (action.type) {
            case Action.types.SetUser: {
                return Object.assign({}, state, {user: action.user});
            }
            case Action.types.SetLinkmans: {
                return Object.assign({}, state, {linkmans: action.linkmans});
            }
            case Action.types.AddLinkman: {
                state.linkmans.push(action.linkman);
                return Object.assign({}, state);
            }
            case Action.types.AddMessage: {
                let linkman = state.limkmans.find(x => x.userId === action.userId);
                if (!linkman) {
                    return state;
                }
                linkman.messages.push(action.message);
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