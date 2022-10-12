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
      socket.join('ui');
      console.log('React client has joined')
    } else {
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', async data => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log(mongooseResponse)
  });

  socket.on('perfData', data => {
    // console.log(data);
    // console.log('tick...');
    io.to('ui').emit('data', data)
  });
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne({
      macA: data.macA
    }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        let newMachine = new Machine(data);
        newMachine.save();
        resolve('added');
      } else {
        resolve ('found');
      }
    })
  });
}

module.exports = socketMain;