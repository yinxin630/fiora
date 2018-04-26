import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Message from '@/components/Message';
import Avatar from '@/components/Avatar';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import socket from '@/socket';
import action from '@/state/action';
import fetch from 'utils/fetch';
import GroupInfo from '../GroupInfo';
import UserInfo from '../UserInfo';

class Feature extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAddButton: true,
            showCreateGroupDialog: false,
            showSearchResult: false,
            searchResultActiveKey: 'all',
            searchResult: {
                users: [],
                groups: [],
            },
            showGroupInfo: false,
            groupInfo: {},
            showUserInfo: false,
            userInfo: {},
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick.bind(this), false);
    }
    resetSearchView() {
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
    handleBodyClick(e) {
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
        } while (target !== currentTarget);
        this.resetSearchView();
    }
    @autobind
    handleFocus() {
        this.setState({
            showAddButton: false,
            showSearchResult: true,
        });
    }
    @autobind
    showCreateGroupDialog() {
        this.setState({
            showCreateGroupDialog: true,
        });
    }
    @autobind
    closeCreateGroupDialog() {
        this.setState({
            showCreateGroupDialog: false,
        });
    }
    @autobind
    handleCreateGroup() {
        const name = this.groupName.getValue();
        socket.emit('createGroup', { name }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                res.type = 'group';
                action.addLinkman(res, true);
                this.groupName.clear();
                this.closeCreateGroupDialog();
                Message.success('创建群组成功');
            }
        });
    }
    async search() {
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
    @autobind
    handleInputKeyDown(e) {
        if (e.key === 'Enter') {
            setTimeout(() => {
                this.search();
                this.lastSearchTime = Date.now();
            }, 0);
        }
    }
    @autobind
    handleActiveKeyChange(key) {
        this.setState({
            searchResultActiveKey: key,
        });
    }
    @autobind
    switchTabToUser() {
        this.setState({
            searchResultActiveKey: 'user',
        });
    }
    @autobind
    switchTabToGroup() {
        this.setState({
            searchResultActiveKey: 'group',
        });
    }
    openGroupInfoDialog(groupInfo) {
        this.setState({
            showGroupInfo: true,
            groupInfo,
        });
        this.resetSearchView();
    }
    @autobind
    closeGroupInfoDialog() {
        this.setState({
            showGroupInfo: false,
        });
    }
    openUserInfoDialog(userInfo) {
        this.setState({
            showUserInfo: true,
            userInfo,
        });
        this.resetSearchView();
    }
    @autobind
    closeUserInfoDialog() {
        this.setState({
            showUserInfo: false,
        });
    }
    @autobind
    renderSearchUsers(count = Infinity) {
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
    @autobind
    renderSearchGroups(count = Infinity) {
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
            showCreateGroupDialog,
            searchResult, showSearchResult,
            searchResultActiveKey,
            showGroupInfo,
            groupInfo,
            showUserInfo,
            userInfo,
        } = this.state;
        return (
            <div className="chatPanel-feature">
                <input className={showSearchResult ? 'focus' : 'blur'} type="text" placeholder="搜索群组/用户" autoComplete="false" ref={i => this.searchInput = i} onFocus={this.handleFocus} onKeyDown={this.handleInputKeyDown} />
                <i className="iconfont icon-search" />
                <IconButton style={{ display: showAddButton ? 'block' : 'none' }} width={40} height={40} icon="add" iconSize={38} onClick={this.showCreateGroupDialog} />
                <Dialog className="create-group-dialog" title="创建群组" visible={showCreateGroupDialog} onClose={this.closeCreateGroupDialog}>
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
                <GroupInfo visible={showGroupInfo} groupInfo={groupInfo} onClose={this.closeGroupInfoDialog} />
                <UserInfo visible={showUserInfo} userInfo={userInfo} onClose={this.closeUserInfoDialog} />
            </div>
        );
    }
}

export default Feature;
