import commandLineArgs from 'command-line-args';

const optionDefinitions = [
    { name: 'database', type: String },
    { name: 'jwtSecret', type: String },
    { name: 'qiniuAccessKey', type: String },
    { name: 'qiniuSecretKey', type: String },
    { name: 'qiniuBucket', type: String },
    { name: 'qiniuUrlPrefix', type: String },
    { name: 'allowOrigin', type: String, multiple: true },
    { name: 'publicPath', type: String },
    { name: 'host', type: String },
    { name: 'port', type: Number },
    { name: 'administrator', type: String },
    { name: 'frontendMonitorAppId', type: String },
    { name: 'username', type: String },
    { name: 'password', type: String },
];

interface CommandArgs {
    database: string;
    jwtSecret: string;
    qiniuAccessKey: string;
    qiniuSecretKey: string;
    qiniuBucket: string;
    qiniuUrlPrefix: string;
    allowOrigin: string[];
    publicPath: string;
    host: string;
    port: number;
    administrator: string;
    frontendMonitorAppId: string;
    username: string;
    password: string;
}

const args = commandLineArgs(optionDefinitions) as CommandArgs;

export default args;
