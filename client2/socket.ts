import IO from 'socket.io-client';

import config from '../config/client';


const options = {
    // reconnectionDelay: 1000,
};
const socket = new IO(config.server, options);
export default socket;
