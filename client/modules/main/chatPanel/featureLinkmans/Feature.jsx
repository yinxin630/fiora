import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Message from '@/components/Message';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import socket from '@/socket';
import action from '@/state/action';

class Feature extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAddButton: true,
            showCreateGroupDialog: false,
            showSearchResult: false,
            searchResult: {
                users: [],
                groups: [],
            },
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick.bind(this), false);
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
        this.setState({
            showSearchResult: false,
            showAddButton: true,
        });
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
                action.addGroup(res);
                this.groupName.clear();
                this.closeCreateGroupDialog();
                Message.success('创建群组成功');
            }
        });
    }
    search() {
        console.log('search', this.searchInput.value);
    }
    @autobind
    handleInputKeyDown(e) {
        if (e.key === 'Enter') {
            this.search();
        }
    }
    render() {
        const { showAddButton, showCreateGroupDialog, searchResult, showSearchResult } = this.state;
        return (
            <div className="chatPanel-feature">
                <input className={showSearchResult ? 'focus' : 'blur'} placeholder="搜索群组/用户" ref={i => this.searchInput = i} onFocus={this.handleFocus} onKeyDown={this.handleInputKeyDown} />
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
                    defaultActiveKey="all"
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    <TabPane tab="全部" key="all">
                        {
                            searchResult.users.length === 0 && searchResult.groups.length === 0 ?
                                <p>没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                (
                                    <div>
                                        <div>
                                            <p>用户</p>
                                            <div className="user-list">{this.renderSearchUsers()}</div>
                                        </div>
                                        <div>
                                            <p>群组</p>
                                            <div className="group-list">{this.renderSearchGroups()}</div>
                                        </div>
                                    </div>
                                )
                        }
                    </TabPane>
                    <TabPane tab="用户" key="user">
                        {
                            searchResult.users.length === 0 ?
                                <p>没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                <div className="user-list">{this.renderSearchUsers()}</div>
                        }
                    </TabPane>
                    <TabPane tab="群组" key="group">
                        {
                            searchResult.groups.length === 0 ?
                                <p>没有搜索到内容, 换个关键字试试吧~~</p>
                                :
                                <div className="group-list">{this.renderSearchGroups()}</div>
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Feature;
