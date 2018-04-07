import IO from 'socket.io-client';

const socket = new IO('//localhost:9200');
export default socket;
