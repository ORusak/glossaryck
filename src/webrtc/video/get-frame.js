// Получение кадра
var video = document.getElementById('myVideo'),
canvas = document.createElement('canvas'),
context = canvas.getContext('2d'),
width = 640, height = 480;

setInterval(function(){
    context.drawImage(video, 0, 0, width, height);
    var pngData = canvas.toDataURL();
    // do something with ’data:image/png;base64,<base64_data>’
}, 1000/15);
