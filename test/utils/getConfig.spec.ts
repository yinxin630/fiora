describe('utils/getConfig.ts', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should get config from command args', () => {
        process.argv = ['--a', 'aaa'];
        const getConfig = require('../../utils/getConfig').default;
        expect(getConfig('a')).toBe('aaa');
    });

    it('should get all values as array', () => {
        process.argv = ['--administrator', 'user1', 'user2'];
        const getConfig = require('../../utils/getConfig').default;
        expect(getConfig('administrator')).toEqual(['user1', 'user2']);
    });

    it('should get boolean or number value', () => {
        process.argv = ['--port', '9999', '--disableCreateGroup', 'false'];
        const getConfig = require('../../utils/getConfig').default;
        expect(getConfig('port')).toBe(9999);
        expect(getConfig('disableCreateGroup')).toBe(false);
    });

    it('should return default value when not exists', () => {
        process.argv = ['a'];
        const getConfig = require('../../utils/getConfig').default;
        expect(getConfig('c', 'ccc')).toBe('ccc');
    });

    it('should get config from environment variable', () => {
        process.env = {
            Administrator: 'user',
        };
        const getConfig = require('../../utils/getConfig').default;
        expect(getConfig('administrator')).toBe('user');
    });
});
