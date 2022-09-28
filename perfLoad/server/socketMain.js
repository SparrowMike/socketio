function socketMain(io, socket) {
  // console.log('Called main socket', socket.id)

  socket.on('clientAuth', key => {
    if (key === 'magicalpass') {
      socket.join('clients');
    } else if (key === 'anotherranomkey') {
      socket.join9('ui');
    } else {
      socket.disconnect(true);
    }
  })

  socket.on('perfData', data => {
    console.log(data);
  })
}

module.exports = socketMain;