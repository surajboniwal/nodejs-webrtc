//Inits
var socket = io()

//Objects
const createMeeting = document.getElementById('createMeeting')
const joinForm = document.getElementById('joinForm')
//Variables

//JS
joinForm.addEventListener('submit', e=>{
    e.preventDefault()
    const meetingIDInput = joinForm.firstElementChild
})

createMeeting.addEventListener('click', ()=>{
    socket.emit('create-meeting')
})

//Sockets
socket.on('redirect', (destination)=>{
    window.location = `/${destination}`
})