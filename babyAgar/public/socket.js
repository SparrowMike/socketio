let socket = io.connect();

function init() {
    draw()

    socket.emit('init', {
        playerName: player.name
    });
}

socket.on('init', (data) => {
    orbs = data.orbs;
});