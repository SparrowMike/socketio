const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', (socket) => { // io.on = io.of('/').on
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
        console.log(`${nsSocket.id} has join ${namespace.endpoint}`)

        nsSocket.emit('nsRoomLoad', namespaces[0].rooms)
        nsSocket.on('joinRoom', async (roomToJoin, numberOfUsersCallback) => {
            nsSocket.join(roomToJoin)
            const clients = await io.of('/wiki').in(roomToJoin).allSockets();
            // numberOfUsersCallback(Array.from(clients).length)
            
            const nsRoom = namespaces[0].rooms.find(room => {
                return room.roomTitle === roomToJoin;
            });

            nsSocket.emit('historyCatchUp', nsRoom.history)
            io.of('wiki').in(roomToJoin).emit('updateMembers', Array.from(clients).length)
        });
        nsSocket.on('newMessageToServer', (msg) => {
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: 'dude',
                avatar: 'https://via.placeholder.com/30'
            }
            const roomTitle = Array.from(nsSocket.rooms)[1];
            const nsRoom = namespaces[0].rooms.find(room => {
                return room.roomTitle === roomTitle;
            });
            nsRoom.addMessage(fullMsg)
            io.of('/wiki').to(roomTitle).emit('messageToClients', fullMsg);
        });
    });
});