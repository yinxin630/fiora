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
    { name: 'subDirectory', type: String },
    { name: 'port', type: Number },
    { name: 'administrator', type: String },
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
    subDirectory: string;
    port: number;
    administrator: string;
}

const args: CommandArgs = commandLineArgs(optionDefinitions);

export default args;
