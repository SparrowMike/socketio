const io = require('../servers').io

const checkForOrbCollisions = require('./checkCollisions').checkForOrbCollisions;
const checkForPlayerCollisions = require('./checkCollisions').checkForPlayerCollisions;
const Orb = require('./classes/Orb');
const Player = require('./classes/Player');
const PlayerData = require('./classes/PlayerData');
const PlayerConfig = require('./classes/PlayerConfig');
const orbs = [];
const players = [];
let settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    defaultZoom: 1.5,
    worldWidth: 500,
    worldHeight: 500
};

initGame();

setInterval(() => {
    if (players.length > 0) {
        io.to('game').emit('tock', {
            players,
        })
    }
}, 33);

io.sockets.on('connect', (socket) => {
    let player = {};
    socket.on('init', data => {
        socket.join('game');

        let playerConfig = new PlayerConfig(settings);
        
        let playerData = new PlayerData(data.playerName, settings);
        
        player = new Player(socket.id, playerConfig, playerData);


        // issue a message to every socket - 30fps
        setInterval(() => {
            io.emit('tickTock', {
                playerX: player.playerData.locX,
                playerY: player.playerData.locY
            })
        }, 33); // there are 30 33s in 1000 milliseconds, or 1/30th of a seconds, or 1 of 30fps

        socket.emit('init', {
            orbs
        });
        players.push(playerData);
    });

    socket.on('tick', data => {
        speed = player.playerConfig.speed;
        xV = player.playerConfig.xVector = data.xVector;
        yV = player.playerConfig.yVector = data.yVector;

        if ((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > settings.worldWidth) && (xV > 0)) {
            player.playerData.locY -= speed * yV;
        } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > settings.worldHeight) && (yV < 0)) {
            player.playerData.locX += speed * xV;
        } else {
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
        let capturedOrb = checkForOrbCollisions(player.playerData, player.playerConfig, orbs, settings)
        capturedOrb.then(data => {
            const orbData = {
                orbIndex: data,
                newOrb: orbs[data]
            }
            io.sockets.emit('orbSwitch', orbData)
        }).catch(() => {
            // console.log('no collision')
        });

        let playerDeath = checkForPlayerCollisions(player.playerData, player.playerConfig, players, player.socketId)
        playerDeath.then(data => {
            console.log('player collision')
        }).catch(() => {

        })
    });
});

function initGame() {
    for(let i = 0; i < settings.defaultOrbs; i++) {
        orbs.push(new Orb(settings));
    }
};

module.exports = io;