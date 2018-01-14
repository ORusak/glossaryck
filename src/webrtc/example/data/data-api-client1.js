
var pc = new RTCPeerConnection({}, {
    //  требуется использовать канал данных
    optional: [{ RtpDataChannels: true }]
});

var channel = pc.createDataChannel("sendDataChannel", {
    //  надежность не требуется
    reliable: false
});

channel.send(JSON.stringify({}));
