const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('save', log('save'));
socket.on('error', log('error'));

function log(eventType) {
  return (payload) => {
    socket.emit(eventType, payload);
  };
}
