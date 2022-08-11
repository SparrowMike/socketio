const express = require('express');
const app = express();
// Making random change here to create a conflict

app.use(express.static(__dirname + '/public'));
const socketio = require('socket.io');
// Making random change here to create a conflict


// Making random change here to create a conflict
const expressServer = app.listen(8080);
const io = socketio(expressServer);
const helmet = require('helmet');
app.use(helmet())
// Making random change here to create a conflict

module.exports = {
    app,
    io
}
