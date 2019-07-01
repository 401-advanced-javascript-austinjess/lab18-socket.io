const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const hub = require('./hub');

const initializeLogger = () => {
  hub.on('save', log('save'));
  hub.on('error', log('error'));

  function log(eventType) {
    return (payload) => {
      console.log(eventType, payload);
      setTimeout(
        () =>
          socket.emit(eventType, {
            source: 'networkLogger',
            payload,
          }),
        5000
      );
    };
  }
};

initializeLogger();
