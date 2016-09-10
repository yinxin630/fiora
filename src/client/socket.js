import socketClient from 'socket.io-client';
import socketWrap from './util/socketWrap';
import config from '../../config/config';

const serverUrl = `http://${process.env.NODE_ENV === 'production' ? config.server : 'localhost'}:${config.port}/`;
export default socketWrap(socketClient(serverUrl));
