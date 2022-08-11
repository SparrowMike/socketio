const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));

// Making random change here to create a conflict
const socketio = require('socket.io');
const expressServer = app.listen(8080);


// Making random change here to create a conflict
const io = socketio(expressServer);
const helmet = require('helmet');
app.use(helmet())

// Making random change here to create a conflict
module.exports = {
    app,
    io
}
