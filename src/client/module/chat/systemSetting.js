import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/systemSetting.scss';

import ui from '../../action/ui';

class SystemSetting extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        desktopNotification: PropTypes.bool,
        soundNotification: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick() {
        ui.closeSystemSetting();
        ui.closeMaskLayout();
    }

    render() {
        const { show, desktopNotification, soundNotification } = this.props;

        return (
            <Motion
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale: spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div
                        className="system-setting"
                        style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
                    >
                        <div>
                            <span>系统设置</span>
                            <i
                                className="icon"
                                onClick={this.handleCloseClick}
                            >&#xe603;</i>
                        </div>
                        <div>
                            <div>
                                <span>启用桌面通知</span>
                                <div
                                    onClick={() => ui.toggleDesktopNotification()}
                                >
                                    <div
                                        className={desktopNotification ? 'on' : 'off'}
                                    />
                                </div>
                            </div>
                            <div>
                                <span>启用声音通知</span>
                                <div
                                    onClick={() => ui.toggleSoundNotification()}
                                >
                                    <div
                                        className={soundNotification ? 'on' : 'off'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showSystemSetting']),
        desktopNotification: state.getIn(['ui', 'desktopNotification']),
        soundNotification: state.getIn(['ui', 'soundNotification']),
    })
)(SystemSetting);
