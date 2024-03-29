let wHeight = $(window).height();
let wWidth = $(window).width();
let player = {};
let orbs = [];
let players = []

let canvas = document.querySelector('#the-canvas');
let context = canvas.getContext('2d');
canvas.width = wWidth;
canvas.height = wHeight;

$(window).load(() => {
    $('#loginModal').modal('show');
});

$('.name-form').submit((event) => {
    event.preventDefault();
    player.name = $('#name-input').val()
    $('#loginModal').modal('hide');
    $('#spawnModal').modal('show');
    $('.player-name').html(player.name);
});

$('.start-game').click(() => {
    $('.modal').modal('hide');
    $('.hiddenOnStart').removeAttr('hidden');
    init();
});