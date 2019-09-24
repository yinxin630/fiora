import { addParam } from '../../utils/url';

describe('utils/url.ts', () => {
    test('无参数url', () => {
        const url = 'https://fiora.suisuijiang.com';
        const key = 'key';
        const value = 'value';
        const params = {
            [key]: value,
        };
        expect(addParam(url, params)).toBe(`${url}?${key}=${value}`);
    });

    test('有参数url', () => {
        const url = 'https://fiora.suisuijiang.com?a=a';
        const key = 'key';
        const value = 'value';
        const params = {
            [key]: value,
        };
        expect(addParam(url, params)).toBe(`${url}&${key}=${value}`);
    });
});
