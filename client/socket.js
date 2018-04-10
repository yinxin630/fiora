import IO from 'socket.io-client';


const options = {
    reconnectionDelay: 3000,
};
const socket = new IO('//localhost:9200', options);
export default socket;
