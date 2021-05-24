const d3 = require('d3-time');

var start = new Date(2021, 00, 01);
var end = new Date(2021, 02, 18);

var miliSegundosDia = 24*60*60*1000;

var resultado = (end-start) / miliSegundosDia

console.log(resultado);


console.log(d3.timeDay.count(start, end));