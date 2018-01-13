var pc;

//  соединение (signalingChannel) это на пример socket
//  получене предложения на соединение
signalingChannel.onoffer = function (sdpOffer) {
    //  создание соединеия
    pc = new RTCPeerConnection({ iceServers: [...] });

    //  запрос на данные с ресурсов
    navigator.getUserMedia({ audio: true, video: true }, function (stream) {
        //  добавление медиа потока к соединению
        pc.addStream(stream);
        //  установка медиа описания удаленного клиента
        pc.setRemoteDescription(new RTCSessionDescription(sdpOffer), function () {
            //  подготовка ответа
            pc.createAnswer(function (answer) {
                //  установка медиа информации о своем соединении
                pc.setLocalDescription(answer);
                //  отправка собеседнику медиа информации о своем соединении
                signalingChannel.send("answer", JSON.stringify({ answer }))
            })
        });

        //  подписываемся на получение ice данных о своем подключении
        //  для отправки собеседнику
        pc.onicecandidate = function (event) {
            /*send ice to signalingChannel*/ 
            signalingChannel.send("ice", JSON.stringify({ ice: event.ice }))
        };

        //  подписываемся на получение потока от собеседника
        //  для его вывода
        pc.onaddstream = function (evt) {
        remoteVideoTag.src =
            URL.createObjectURL(evt.stream);
        };
    }, console.error);
};

// ожидание ice подключения собеседника
signalingChannel.on("icecandidate", function (iceCandidate) {
    //  устанавливаем данные ice собеседника
    pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
});
