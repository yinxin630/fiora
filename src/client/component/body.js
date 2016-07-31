import React from 'react';
import '../style/body.scss';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <div className="left">
                    <div>
                        <img src={ require('../image/avatar.gif') }></img>
                        <div>
                            <div>
                                <p>碎碎酱</p>
                                <p>12:34</p>
                            </div>
                            <div>
                                <p>我是一个老司机, 老啊老司机.我是一个老司机, 老啊老司机.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={ require('../image/avatar.gif') }></img>
                        <div>
                            <div>
                                <p>碎碎酱</p>
                                <p>12:34</p>
                            </div>
                            <div>
                                <p>我是一个老司机, 老啊老司机.我是一个老司机, 老啊老司机.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        );
    }
}

export default Body;