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
        backgroundImage: require('../client/assets/images/background.jpg'),
        aero: false,
    },
    cool: {
        primaryColor: '5,159,149',
        primaryTextColor: '255, 255, 255',
        backgroundImage: require('../client/assets/images/background-cool.jpg'),
        aero: false,
    },
};

export default themes;
