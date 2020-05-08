const args: {
    [key: string]: any;
} = {};
const { argv } = process;
let argvKey = '';
let argvValue = [];
for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
        argvKey = argv[i].slice(2);
        argvValue = [];
    } else if (argvKey) {
        let value: any = argv[i];
        if (value === 'true' || value === 'false') {
            value = value === 'true';
        } else if (/^\d+$/.test(value)) {
            value = parseInt(value, 10);
        }
        argvValue.push(value);
    }
    if (argvKey && argvValue.length && (argv[i].startsWith('--') || i === argv.length - 1)) {
        args[argvKey] = argvValue.length > 1 ? argvValue : argvValue[0];
    }
}

const { env } = process;

export default function getConfig<T = string>(key: string, defaultValue: any = ''): T {
    return args[key] ?? env[key.slice(0, 1).toUpperCase() + key.slice(1)] ?? defaultValue;
}
