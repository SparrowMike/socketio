const os = require('os');
const cpus = os.cpus();

const freeMem = os.freemem();
const totalMem = os.totalmem();
const usedMem = totalMem - os.freeMem;
const memUseage = Math.floor(usedMem/totalMem*100) / 100;

const osType = os.type() == 'Darwin' ? 'Mac' : os.type();

const upTime = os.uptime();

const cpuModel = cpus[0].model;

const numCores = cpus.length;
const cpuSpeed = cpus[0].speed;
console.log(osType, cpuSpeed)