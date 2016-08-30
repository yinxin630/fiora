import socketClient from 'socket.io-client';
import socketWrap from './util/socketWrap';

export default socketWrap(socketClient('http://localhost:9200'));
