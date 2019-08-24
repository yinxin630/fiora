import path from 'path';

const pages = [
    {
        filename: 'index.html',
        template: path.resolve(__dirname, '../client/templates/index.html'),
        inject: true,
        chunks: ['app'],
        entry: {
            key: 'app',
            file: path.resolve(__dirname, '../client/main.tsx'),
        },
    },
];

export default pages;
