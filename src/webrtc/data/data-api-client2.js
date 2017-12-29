var pc = new RTCPeerConnection({}, {
    optional: [{ RtpDataChannels: true }]
});
var channel;
pc.ondatachannel = function (event) {
    channel = event.channel;
    channel.onmessage = function (event) {
        //handle message
    }
};