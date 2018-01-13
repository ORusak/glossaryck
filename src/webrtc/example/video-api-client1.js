//  Новое соединение
var pc = new RTCPeerConnection({ iceServers: [...] });

//  Получаем поток
navigator.getUserMedia({ audio: true, video: true }, function (stream) {
    //  добавляем к соединению полученный поток
    pc.addStream(stream);
    //  создаем контракт на соединение
    pc.createOffer(function (offer) {
        //  записываем контракт в свое соединение
        pc.setLocalDescription(offer);
        //  отправляем по соединению собеседнику
        //  соединение (signalingChannel) это на пример socket
        signalingChannel.send("offer", JSON.stringify({ offer }))
    });
    //  при готовности ice кондидата (данные о сетевой карте, порту) отправляем собеседнику
    pc.onicecandidate = function (event) {
        /*send ice to signalingChannel*/ 
        //  ice: event.ice?
        signalingChannel.send("ice", JSON.stringify({ ice: event.ice }))
    };
    // при получении от собеседника потока выводим его
    pc.onaddstream = function (evt) { 
        remoteVideoTag.src = URL.createObjectURL(evt.stream); 
    };
}, console.error);

//  подписываем на ответ от собеседника
signalingChannel.on("answer", function (answer) {
    //  устанавливаем полученные медиа от собеседника
    pc.setRemoteDescription(new RTCSessionDescription(answer));
};

//  подписываем на ответ ?
signalingChannel.on("icecandidate", function (iceCandidate) {
    //  устанавливаем полученные
    pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
};
