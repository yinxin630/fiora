import { useSelector } from 'react-redux';
import { State } from '../state/reducer';

/**
 * 获取毛玻璃状态属性
 */
export default function useAero() {
    const aero = useSelector((state: State) => state.status.aero);
    return {
        'data-aero': aero,
    };
}
