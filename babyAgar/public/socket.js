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
    console.log(data)
    players = data.players;
})

socket.on('orbSwitch', data => {
    orbs.splice(data.orbIndex, 1, data.newOrb);
});

socket.on('tickTock', data => {
    player.locX = data.playerX;
    player.locY = data.playerY;
});

socket.on('updateLeaderBoard', data => {
    document.querySelector('.leader-board').innerHTML = '';
    data.forEach(curPlayer => {
        document.querySelector('.leader-board').innerHTML += `
            <li class='leaderboard-player'>${curPlayer.name} - ${curPlayer.score}</li>
        `
    })
});

socket.on('playerDeath', data => {
    document.querySelector('#game-message').innerHTML = `${data.died.name} absorbed by ${data.killedBy.name}`;
    $('#game-message').css({
        'background-color': '#00e6e6',
        'opacity': 1
    });
    $('#game-message').show();
    $('#game-message').fadeOut(500);
});