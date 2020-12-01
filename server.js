const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    path: '/'
});

app.set('view engine', 'ejs');  
app.use(express.static('public'))
app.use('/peerjs', peerServer);

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/:roomID', (req, res)=>{
    res.render('room', { roomID : req.params.roomID })
})

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('create-meeting', ()=>{
        socket.emit('redirect' ,uuidv4())
    })
    
    socket.on('join-meeting', (ROOM_ID, USER_ID)=>{
        console.log(`Joined room ${ROOM_ID}`)
        socket.join(ROOM_ID)
        socket.to(ROOM_ID).broadcast.emit('user-connected', USER_ID)
    })

    socket.on('disconnect', ()=>{
        console.log('User disconnected')
    })
});
server.listen(3000);