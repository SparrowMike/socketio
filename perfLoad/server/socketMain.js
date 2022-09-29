const mongoose = require('mongoose');

const Machine = require('./models/Machine');

mongoose.connect('mongodb://127.0.0.1/perfData')
function socketMain(io, socket) {
  let macA;
  // console.log('Called main socket', socket.id)

  socket.on('clientAuth', key => {
    if (key === 'magicalpass') {
      socket.join('clients');
    } else if (key === 'anotherranomkey') {
      socket.join9('ui');
    } else {
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', data => {
    macA = data.macA;
    checkAndAdd(macA)
  });

  socket.on('perfData', data => {
    console.log(data);
  });
}

module.exports = socketMain;