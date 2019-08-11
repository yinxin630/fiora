const UA = window.navigator.userAgent;

export const isiOS = /iPhone/i.test(UA);

export const isAndroid = /android/i.test(UA);

export const isMobile = isiOS || isAndroid;
