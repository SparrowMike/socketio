import io from 'socket.io-client';

let socket = io.connect('http://localhost:8181', {
  transports: ['websocket'], // Required when using Vite      
})

// console.log('socket', socket)

socket.emit('clientAuth', 'anotherranomkey')

export default socket;