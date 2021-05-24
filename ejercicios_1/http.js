const http = require('http');

/*
const server = http.createServer();

server.on('connection', (socket) => {
    console.log('Una nueva conexion');
})

server.listen(2012)

console.log('Escuchando papi');



const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('wenas')
        res.write('Aca apenas estamos haciendo cositas')
        res.end()
    }

    if(req.url === '/coches'){
        res.write('coche1')
        res.end()
    }
});

*/

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('<h1>Pos ya</h1>')
    res.end()
});

server.listen(3030)

console.log('Escuchando papi');