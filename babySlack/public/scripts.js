const socket = io();
let nsSocket = '';

socket.on('nsList', (nsData) => {
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = '';
    nsData.forEach(ns => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"></div>`;
    });

    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        element.addEventListener('click', (e) => {
            const nsEndpoint = element.getAttribute('ns')
            console.log('I should go to now', nsEndpoint)
        });
    });
    joinNs('/wiki')
});