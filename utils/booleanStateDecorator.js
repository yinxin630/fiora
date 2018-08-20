/**
 * 向组件state添加boolean状态值, 并给组件添加切换状态的方法
 * 因为装饰器不允许传参, 所以该方法其实是一个装饰器工厂函数
 * @param {Object} values key: state键名 value: state默认值
 */
export default function booleanStateDecorator(values) {
    return function (target) {
        class BooleanStateDecoratorWrap extends target {
            constructor(...args) {
                super(...args);
                this.state = this.state || {};

                for (const key in values) {
                    // 忽略非boolean类型
                    if (typeof values[key] !== 'boolean') {
                        return;
                    }

                    this.state[key] = values[key];
                    const upperKey = key[0].toUpperCase() + key.substr(1);
                    this[`toggle${upperKey}`] = (value) => {
                        if (typeof value === 'boolean') {
                            this.setState({ [key]: value });
                        } else {
                            this.setState({ [key]: !this.state[key] });
                        }
                    };
                }
            }
            render() {
                return super.render();
            }
        }
        return BooleanStateDecoratorWrap;
    };
}
