/** 封禁后提示文案 */
export const SealText = '你已经被关进小黑屋中, 请反思后再试';

/** 封禁用户释放时间 */
export const SealUserTimeout = 1000 * 60 * 10; // 10分钟

/** 封禁ip释放时间 */
export const SealIpTimeout = 1000 * 60 * 60 * 6; // 6小时

/** 透明图 */
export const transparentImage = 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==';

/** 加密salt位数 */
export const saltRounds = 10;

export const MB = 1024 * 1024;

export const NameRegexp = /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]|[\u3040-\u309Fー]|[\u30A0-\u30FF]){1,8}$/;