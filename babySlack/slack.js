const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(process.env.PORT || 9000);
const io = socketio(expressServer);

io.on('connection', (socket) => { // io.on = io.of('/').on
    // console.log(socket.handshake)
    let nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    });
    socket.emit('nsList', nsData)
});

namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        // console.log(`${nsSocket.id} has join ${namespace.endpoint}`)
        const username = nsSocket.handshake.query.username;
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom', async (roomToJoin, numberOfUsersCallback) => {
            const roomTitle = Array.from(nsSocket.rooms)[1];
            const clients = await io.of(namespace.endpoint).in(roomToJoin).allSockets();
            // numberOfUsersCallback(Array.from(clients).length)

            nsSocket.leave(roomTitle)
            updateUsersInRoom(namespace, roomTitle, clients)

            nsSocket.join(roomToJoin)
            
            
            const nsRoom = namespace.rooms.find(room => {
                return room.roomTitle === roomToJoin;
            });
            nsSocket.emit('historyCatchUp', nsRoom.history)
            updateUsersInRoom(namespace, roomToJoin, clients)
        });
        nsSocket.on('newMessageToServer', (msg) => {
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: username || 'new dude',
                avatar: 'https://via.placeholder.com/30'
            }
            const roomTitle = Array.from(nsSocket.rooms)[1];
            const nsRoom = namespace.rooms.find(room => {
                return room.roomTitle === roomTitle;
            });
            nsRoom.addMessage(fullMsg)
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);
        });
    });
});

function updateUsersInRoom(namespace, room, clients) {
    io.of(namespace.endpoint).in(room).emit('updateMembers', Array.from(clients).length);
}