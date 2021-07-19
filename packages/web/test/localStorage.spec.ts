import getData, { LocalStorageKey } from '../src/localStorage';
import config from '../../config/client';
import themes from '../src/themes';

describe('client/localStorage.ts', () => {
    it('should return localStorage value, or default value if not exists', () => {
        expect(getData().sound).toBe(config.sound);
        localStorage.setItem(LocalStorageKey.Sound, 'huaji');
        expect(getData().sound).toBe('huaji');
    });

    it('should return default theme config when them not exists', () => {
        localStorage.setItem(LocalStorageKey.Theme, 'xxx');
        expect(getData().primaryColor).toBe(themes.cool.primaryColor);
    });

    it('should return boolean type value when value is true / false', () => {
        localStorage.setItem(LocalStorageKey.SoundSwitch, 'true');
        expect(getData().soundSwitch).toBe(true);
        localStorage.setItem(LocalStorageKey.SoundSwitch, 'false');
        expect(getData().soundSwitch).toBe(false);
    });
});
