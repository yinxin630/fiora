import { useSelector } from 'react-redux';
import { State } from '../state/reducer';

/**
 * 获取登录态
 */
export default function useIsLogin() {
    const isLogin = useSelector((state: State) => state.user && state.user._id !== '');
    return isLogin;
}
