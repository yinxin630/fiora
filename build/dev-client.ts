/* eslint-disable import/no-extraneous-dependencies */

import 'eventsource-polyfill';

// @ts-ignore
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true'; // eslint-disable-line import/no-unresolved

hotClient.subscribe((event: any) => {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
