import React, { Component } from 'react';

import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Message from '@/components/Message';
import Avatar from '@/components/Avatar';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import socket from '@/socket';
import action from '@/state/action';
import fetch from 'utils/fetch';
import booleanStateDecorator from 'utils/booleanStateDecorator';
import GroupInfo from '../GroupInfo';
import UserInfo from '../UserInfo';


@booleanStateDecorator({
    groupInfoDialog: false,
    userInfoDialog: false,
    createGroupDialog: false,
})
class Feature extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAddButton: true,
            showSearchResult: false,
            searchResultActiveKey: 'all',
            searchResult: {
                users: [],
                groups: [],
            },
            groupInfo: {},
            userInfo: {},
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick, false);
    }
    resetSearchView = () => {
        this.setState({
            showSearchResult: false,
            showAddButton: true,
            searchResultActiveKey: 'all',
            searchResult: {
                users: [],
                groups: [],
            },
        });
        this.searchInput.value = '';
    }
    handleBodyClick = (e) => {
        if (e.target === this.searchInput || !this.state.showSearchResult) {
            return;
        }

        const { currentTarget } = e;
        let { target } = e;
        do {
            if (/search-result/.test(target.className)) {
                return;
            }
            target = target.parentElement;
        } while (target && target !== currentTarget);
        this.resetSearchView();
    }
    handleFocus = () => {
        this.setState({
            showAddButton: false,
            showSearchResult: true,
        });
    }
    handleCreateGroup = () => {
        const name = this.groupName.getValue();
        socket.emit('createGroup', { name }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                res.type = 'group';
                action.addLinkman(res, true);
                this.groupName.clear();
                this.toggleCreateGroupDialog();
                Message.success('创建群组成功');
            }
        });
    }
    search = async () => {
        const keywords = this.searchInput.value.trim();
        const [searchError, searchResult] = await fetch('search', { keywords });
        if (!searchError) {
            this.setState({
                searchResult: {
                    users: searchResult.users,
                    groups: searchResult.groups,
                },
            });
        }
    }
    handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTimeout(() => {
                this.search();
                this.lastSearchTime = Date.now();
            }, 0);
        }
    }
    handleActiveKeyChange = (key) => {
        this.setState({
            searchResultActiveKey: key,
        });
    }
    switchTabToUser = () => {
        this.setState({
            searchResultActiveKey: 'user',
        });
    }
    switchTabToGroup = () => {
        this.setState({
            searchResultActiveKey: 'group',
        });
    }
    openGroupInfoDialog = (groupInfo) => {
        this.setState({
            groupInfoDialog: true,
            groupInfo,
        });
        this.resetSearchView();
    }
    openUserInfoDialog = (userInfo) => {
        this.setState({
            userInfoDialog: true,
            userInfo,
        });
        this.resetSearchView();
    }
    renderSearchUsers(count = 999) {
        const { users } = this.state.searchResult;
        count = Math.min(count, users.length);

        const usersDom = [];
        for (let i = 0; i < count; i++) {
            usersDom.push((
                <div key={users[i]._id} onClick={this.openUserInfoDialog.bind(this, users[i])}>
                    <Avatar size={40} src={users[i].avatar} />
                    <p>{users[i].username}</p>
                </div>
            ));
        }
        return usersDom;
    }
    renderSearchGroups(count = 999) {
        const { groups } = this.state.searchResult;
        count = Math.min(count, groups.length);

        const groupsDom = [];
        for (let i = 0; i < count; i++) {
            groupsDom.push((
                <div key={groups[i]._id} onClick={this.openGroupInfoDialog.bind(this, groups[i])}>
                    <Avatar size={40} src={groups[i].avatar} />
                    <div>
                        <p>{groups[i].name}</p>
                        <p>{groups[i].members}人</p>
                    </div>
                </div>
            ));
        }
        return groupsDom;
    }
    render() {
        const {
            showAddButton,
            createGroupDialog,
            searchResult, showSearchResult,
            searchResultActiveKey,
            groupInfoDialog,
            groupInfo,
            userInfoDialog,
            userInfo,
        } = this.state;
        return (
            <div className="chatPanel-feature">
                <input className={showSearchResult ? 'focus' : 'blur'} type="text" placeholder="搜索群组/用户" autoComplete="false" ref={i => this.searchInput = i} onFocus={this.handleFocus} onKeyDown={this.handleInputKeyDown} />
                <i className="iconfont icon-search" />
                <IconButton style={{ display: showAddButton ? 'block' : 'none' }} width={40} height={40} icon="add" iconSize={38} onClick={this.toggleCreateGroupDialog} />
                <Dialog className="create-group-dialog" title="创建群组" visible={createGroupDialog} onClose={this.toggleCreateGroupDialog}>
                    <div className="content">
                        <h3>请输入群组名</h3>
                        <Input ref={i => this.groupName = i} />
                        <button onClick={this.handleCreateGroup}>创建</button>
                    </div>
                </Dialog>
                <Tabs
                    className="search-result"
                    style={{ display: showSearchResult ? 'block' : 'none' }}
                    activeKey={searchResultActiveKey}
                    onChange={this.handleActiveKeyChange}
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    <TabPane tab="全部" key="all">
                        {
                            searchResult.users.length === 0 && searchResult.groups.length === 0 ?
                                <p className="none">没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                (
                                    <div className="all-list">
                                        <div style={{ display: searchResult.users.length > 0 ? 'block' : 'none' }}>
                                            <p>用户</p>
                                            <div className="user-list">{this.renderSearchUsers(3)}</div>
                                            <div className="more" style={{ display: searchResult.users.length > 3 ? 'block' : 'none' }}>
                                                <span onClick={this.switchTabToUser}>查看更多</span>
                                            </div>
                                        </div>
                                        <div style={{ display: searchResult.groups.length > 0 ? 'block' : 'none' }}>
                                            <p>群组</p>
                                            <div className="group-list">{this.renderSearchGroups(3)}</div>
                                            <div className="more" style={{ display: searchResult.groups.length > 3 ? 'block' : 'none' }}>
                                                <span onClick={this.switchTabToGroup}>查看更多</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }
                    </TabPane>
                    <TabPane tab="用户" key="user">
                        {
                            searchResult.users.length === 0 ?
                                <p className="none">没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                <div className="user-list only">{this.renderSearchUsers()}</div>
                        }
                    </TabPane>
                    <TabPane tab="群组" key="group">
                        {
                            searchResult.groups.length === 0 ?
                                <p className="none">没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                <div className="group-list only">{this.renderSearchGroups()}</div>
                        }
                    </TabPane>
                </Tabs>
                <GroupInfo visible={groupInfoDialog} groupInfo={groupInfo} onClose={this.toggleGroupInfoDialog} />
                <UserInfo visible={userInfoDialog} userInfo={userInfo} onClose={this.toggleUserInfoDialog} />
            </div>
        );
    }
}

export default Feature;
