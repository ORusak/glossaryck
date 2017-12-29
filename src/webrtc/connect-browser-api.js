navigator.getUserMedia({
    audio: true,
    video: true
}, function success (mediaStream) {
    const src = window.URL.createObjectURL(mediaStream)

    document.getElementById('myVideo').src = src
},
function error (error) {
    console.error(error)
})
