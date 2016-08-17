var socket = require('socket.io-client')('http://localhost:9200');
socket.emit('message', { 
    method: 'POST', 
    path: '/user', 
    data: {
        hello: 'hello'
    }
}, (msg) => console.log(msg));

socket.emit('message', { 
    method: 'GET', 
    path: '/user', 
    data: {
        hello: 'hello'
    }
}, (msg) => console.log(msg));