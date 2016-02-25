'use strict'

const Action = require('./action.js');
import { combineReducers, createStore } from 'redux';

function reducer(state = {
        user: {
            id: '0',
            avatar: 'http://chat.suisuijiang.com/images/expression/1.png',
            nickname: '未登录',
        },
        linkmans: [
            {
                id: '1',
                avatar: 'http://chat.suisuijiang.com/images/head.png',
                nickname: '用户1',
                messages: [
                    {
                        time: '11:11:11',
                        content: '你好啊！',
                    },
                    {
                        time: '12:12:12',
                        content: '我不好！',
                    },
                ],
            },
            {
                id: '2',
                avatar: 'http://chat.suisuijiang.com/images/expression/22.png',
                nickname: '用户3',
                messages: [
                    {
                        time: '13:13:13',
                        content: '啊啊啊！',
                    },
                    {
                        time: '14:14:14',
                        content: '喔喔哦！',
                    },
                ],
            },
        ],
        linkmanFocus: -1,
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
            case Action.types.SetLinkmanFocus: {
                state.linkmanFocus = action.index;
                return Object.assign({}, state);
            }
            default:
                return state;
        }
}
let reducers = combineReducers({ reducer });

module.exports = createStore(reducers);

// let unsubscribe = Store.subscribe(() =>
//     console.log('store监控', store.getState())
// );