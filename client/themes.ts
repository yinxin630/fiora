import BackgroundImage from './assets/images/background.jpg';
import BackgroundCoolImage from './assets/images/background-cool.jpg';

type Themes = {
    [theme: string]: {
        primaryColor: string;
        primaryTextColor: string;
        backgroundImage: string;
        aero: boolean;
    };
};

const themes: Themes = {
    default: {
        primaryColor: '74, 144, 226',
        primaryTextColor: '247, 247, 247',
        backgroundImage: BackgroundImage,
        aero: false,
    },
    cool: {
        primaryColor: '5,159,149',
        primaryTextColor: '255, 255, 255',
        backgroundImage: BackgroundCoolImage,
        aero: false,
    },
};

export default themes;
