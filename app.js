const express = require('express')
const app = express();
const port = 2000

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection',(socket) => {
    console.log('Un usuario se ha conectado')

    socket.on('disconnect',() => {
        console.log('Un usuario se ha desconectado')
    })
    socket.on('chat', (msg) => {
        console.log('mensaje: '+ msg)
        io.emit('chat', msg)
    })
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/cliente/index.html`)
})

server.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto: ${port} http://localhost:${port}`)
})