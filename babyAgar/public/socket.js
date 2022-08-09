let socket = io.connect();

function init() {
    draw()

    socket.emit('init', {
        playerName: player.name
    });
}

socket.on('init', (data) => {
    orbs = data.orbs;
    setInterval(() => {
        socket.emit('tick', {
            xVector: player.xVector,
            yVector: player.yVector,
        })
    }, 33)
});

socket.on('tock', data => {
    // console.log(data)
    players = data.players;
})

socket.on('orbSwitch', data => {
    orbs.splice(data.orbIndex, 1, data.newOrb);
});

socket.on('tickTock', data => {
    player.locX = data.playerX;
    player.locY = data.playerY;
});