//Inits
var socket = io('/')

//Objects
const videoContainer = document.querySelector('.video_container');

//Variables
var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3000'
});

navigator.mediaDevices.getUserMedia({
    video:true, 
    audio: true
}).then(myStream=>{
    var localVideo = document.createElement('video');
    localVideo.muted = true;
    addVideoStream(localVideo, myStream);    
    
    peer.on('call', call=>{
        console.log('answer');
        call.answer(myStream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream =>{
            addVideoStream(video, userVideoStream);
        });
    });

    socket.on('user-connected', (USER_ID)=>{
        connectToNewUser(USER_ID, myStream);
    });
});

peer.on('open', id=>{
    console.log('My ID ' + id);
    socket.emit('join-meeting', ROOM_ID, id);
});

const connectToNewUser = (USER_ID, stream) => {
    console.log('New user connected ' + USER_ID);
    const call = peer.call(USER_ID,stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream =>{
        addVideoStream(video, userVideoStream);
    }); 
    call.on('close', ()=>{
        video.remove();
    })
}

function addVideoStream(video, stream){
    video.srcObject = stream;
    video.autoplay = true;
    videoContainer.append(video);
}   
