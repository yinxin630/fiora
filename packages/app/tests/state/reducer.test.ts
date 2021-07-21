import { mergeLinkmans } from '../../src/state/reducer';
import { Linkman } from '../../src/types/redux';

describe('mergeLinkmans', () => {
    it('should return linkmans which is newly and reserve history messages', () => {
        const linkmans1 = [
            {
                _id: 'l1',
                name: 'l1',
                messages: [],
            },
            {
                _id: 'l2',
                name: 'l2',
                messages: [
                    {
                        _id: 'm1',
                    },
                    {
                        _id: 'm2',
                    },
                ],
            },
        ];
        const linkmans2 = [
            {
                _id: 'l2',
                name: 'l2',
                messages: [
                    {
                        _id: 'm1',
                    },
                    {
                        _id: 'm2',
                    },
                ],
            },
            {
                _id: 'l3',
                name: 'l3',
                messages: [],
            },
        ];

        const linkmans = mergeLinkmans(linkmans1 as any, linkmans2 as any) as Linkman[];
        expect(linkmans).toHaveLength(2);
        expect(linkmans[0]._id).toBe('l2');
        expect(linkmans[1]._id).toBe('l3');

        expect(linkmans[0].messages).toHaveLength(2);
    });
});
