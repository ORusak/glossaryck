# WebRTC
* Стандарт, который описывает передачу потоковых аудиоданных, видеоданных и контента от браузера и к браузеру в режиме реального времени без установки плагинов или иных расширений. Стандарт позволяет превратить браузер в оконечный терминал видеоконференцсвязи.
Включает в себя:
* Подключение камеры и микрофона
* Соединение между клиентами: offer/answer, peer to peer (p2p)
* Передача видео и аудио по сети. Анализ ширины канала и подстройка под него битрейта кодека.
* Кодирование и декодирование разными кодеками, которые поддерживает браузер.
* Воспроизведение полученного.
* Передача данных в UDP или TCP стиле.

## Плюсы:
* нет плагинов
* p2p 
* encryption

## Минусы:
* no IE, Safari? Уже есть в каком то виде
* no mobile support? Тоже есть
* масштабирование на несколько пользователей тяжело сделать

## Области применения
* Случаи когда собеседников не много
    * Поддержка на сайте (чат, общение)
    * Телемедицина: приватность, два пользователя
    * Игры: передача данных не влияющих на игровой процесс (чат, позиционирование в игре)
    * Передача файлов

## Типы применения
* Федерации - возможность подсоеденится из вне
* Экосистема - соеденение только со своими клиентами
* Собирательный - подключение как плагины в приложение
* Внедрение - в чужие продукты

# Понятия, определения
* SIP (Session Initiation Protocol, протокол установления сеанса) -  протокол передачи данных (сигнальный), описывающий способ установления и завершения пользовательского интернет-сеанса, включающего обмен мультимедийным содержимым (IP-телефония, видео- и аудиоконференции, мгновенные сообщения, онлайн-игры).
Протокол описывает, каким образом клиентское приложение (например, софтфон) может запросить начало соединения у другого, возможно, физически удалённого клиента, находящегося в той же сети, используя его уникальное имя. Протокол определяет способ согласования между клиентами об открытии каналов обмена на основе других протоколов, которые могут использоваться для непосредственной передачи информации (например, RTP). Допускается добавление или удаление таких каналов в течение установленного сеанса, а также подключение и отключение дополнительных клиентов (то есть допускается участие в обмене более двух сторон — конференц-связь). Протокол также определяет порядок завершения сеанса.
В рамках передачи данных тело сообщения может кодироваться по SDP протоколу.

Является более сложным протоколом чем RTSP, включает его возможности. Подходит для p2p соединений, при обмене медиа потоками в обе стороны.

* RTSP (real time streaming protocol, Потоковый протокол реального времени) — прикладной протокол (сигнальный), предназначенный для использования в системах, работающих с мультимедийными данными (мультимедийным содержимым, медиасодержимым), и позволяющий удалённо управлять потоком данных с сервера, предоставляя возможность выполнения команд, таких как запуск (старт), приостановку (пауза) и остановку (стоп) вещания (проигрывания) мультимедийного содержимого, а также доступа по времени к файлам, расположенным на сервере. Разработан IETF в 1998 году и описан в RFC 2326.
RTSP не выполняет сжатие, а также не определяет метод инкапсуляции мультимедийных данных и транспортные протоколы. Передача потоковых данных сама по себе не является частью протокола RTSP. Большинство серверов RTSP используют для этого стандартный транспортный протокол реального времени, осуществляющий передачу аудио- и видеоданных.

Является более простым по сравнению с SIP. В основном используется для схем клиент - сервер, где медиа поток транслируется только от сервера к клиенту. Например, видеотрансляции на ТВ. 

* SDP (Session Description Protocol) — сетевой протокол прикладного уровня, предназначенный для описания сессии передачи потоковых данных, включая телефонию (ТФОП и VoIP), Интернет-радио, приложения мультимедиа.
Сессия SDP может реализовывать несколько потоков данных. В протоколе SDP в настоящее время определены аудио, видео, данные, управление и приложения (поточные), сходные с MIME типами электронной почты в Интернет-адресах.
Коротко: информация о кодеках, медиаданных, их типе

Сообщение SDP, передаваемое от одного узла другому, может указывать:
* адреса места назначения, которые могут быть для медиа-потоков мультикастинг-адресами
* номера UDP портов для отправителя и получателя
* медиа-форматы (например кодеки, описываемые профилем), которые могут применяться во время сессии
* время старта и остановки. Используется в случае широковещательных сессий, например, телевизионных или радиопрограмм. Можно внести время начала,  завершения и времена повторов сессии

Несмотря на то, что SDP предоставляет возможность описания мультимедиа-данных, в нём не хватает механизмов согласования параметров сессии, которые намерены использовать партнеры. Документ RFC 3264 предоставляет модель согласования на основе механизма предложения / отклика, в которой узлы обмениваются SDP-сообщениями с целью достичь согласия относительно формата данных, в котором будет осуществляться обмен.

SDP представлен в нескольких вариантах:
* Unified Plan -
    * Блочная структура описания медиа потоков
    * Edge, Firefox
* Plan-B - 
    * deprecate
    * Иерархичная структура описания медиа потоков
    * Chrome и Safari 

* ICE (Interactive Connectivity Establishment, Интерактивное подключение) - это метод, используемый в компьютерных сетях, чтобы найти способы, позволяющие двум компьютерам общаться друг с другом как можно более непосредственным образом в одноранговой сети. Это чаще всего используется для интерактивных медиа, таких как передача голоса по интернет-протоколу (VoIP), одноранговая связь, видео и обмен мгновенными сообщениями. В таких приложениях вы избегаете общения через центральный сервер (что замедлит общение и будет дорогостоящим), но прямая связь между клиентскими приложениями в Интернете очень сложна из-за сетевых адресов (NAT), брандмауэров и других сетевые барьеры.
ICE Candidate - информация об интерфейсах, портах для установки соединения.

* NAT (Network address translation) - это механизм в сетях TCP/IP, позволяющий преобразовывать IP-адреса транзитных пакетов. Также имеет названия IP Masquerading, Network Masquerading и Native Address Translation.
Например, преобразование роутом налету пакетов из локальной сети для изменения обратного IP на внешний с портом. За портом закреплен вутренний IP на которые надо будет вернуть ответ.

* Media Streams - interface represents a stream of media content. A stream consists of several tracks such as video or audio tracks. Each track is specified as an instance of MediaStreamTrack.

* MediaStreamTrack - interface represents a single media track within a stream; typically, these are audio or video tracks, but other track types may exist as well.

* SVC (Scalable Video Codecs) - это имя расширения приложения G стандарта сжатия видео H.264 / MPEG-4 AVC. SVC стандартизирует кодирование высококачественного битового потока видео, которое также содержит один или несколько потоковых потоков подмножества. Битовый поток видеопотока подмножества выводится путем удаления пакетов из большего видео, чтобы уменьшить пропускную способность, необходимую для потока бит подмножества. Битовый поток подмножества может представлять собой более низкое пространственное разрешение (меньший экран), более низкое временное разрешение (более низкая частота кадров) или более низкий качественный видеосигнал. H.264 / MPEG-4 AVC был разработан совместно ITU-T и ISO / IEC JTC 1. Эти две группы создали совместную видео-команду (JVT) для разработки стандарта H.264 / MPEG-4 AVC.
Внедрение технологии SVC стало эффективной альтернативой технологиям, применяющимся в MCU (Multipoint Control Unit), которые предполагают полное перекодирование видео для каждого отдельного устройства, что требует больших процессорных мощностей и сказывается на конечной, достаточно высокой стоимости самого MCU-сервера.

* Simulcast (SIMULtaneous broadCAST, одновременной трансляции) - представляет собой трансляцию программ или событий на нескольких носителях или более одной службы на одном и том же носителе в одно и то же время (то есть одновременно). Например,
    * радио одновременно транслируется как на AM, так и на спутниковом радио.
    * одна программа и на video и на радио
    * Много программ на видео. Несколько футбольных матчей в одном видео, просмотр камер безопасности.

# Сервера
Требуются для установления p2p связи между клиентами, построения сложной схемы взаимодействия участников, обработки потоков.web, 
## web server
Решение по взаимодействию с пользователем.

Узкое место память (управление пользователями)
## signaling server
Средство коммуникации участников для установки соединения. Обмен SDP, ICE пакетами.
* Реализация: socket, pub/sub.
* Узкое место память (управление пользователями)
* в продакшене лучше не использовать общедоступные. много open source решений.

## turn, stun server
Средства для сложных вариантов соединения между участниками. Когда установка прямых адресов затруднено например firewall.
* stun - сервер предназначен для изучения топологии сети выдачи адреса соединения
* turn
    * сервер когда адресат закрыт и прямого доступа к нему нет. За firewall устанавливается turn сервер к которому идет соединение и через который идут media потоки.

* Узкое место сеть (подключения, передача медиа потоков)
* в продакшене лучше не использовать общедоступные. много open source решений.
* Готовые решения:
    * для разворачивания у себя coturn, resturnd
    * сторонние twilio, XirSys, bit6

## media server
 Существуют различные разновидности в зависимости от задач.

### SFU (Media Router) 
Распределяет потоки между участниками. 
* Узкое место сеть.
* решения Jitsi, Kurendo, SwitchRTC, mediaSoup
### MCU (Media Mixer) 
Собирает потоки от разных участников в один поток и рассылает.
* Узкое место (по порядку) процессор, память, сеть меньше.
### Recording 
Собирает потоки и записывает. 
* Узкое место хранилище. 

# Вопросы
* Как захватывать рабочий стол?
    * Через расширение браузера получить поток.
* Проверить связь через мобильное устройство
* Реализация связи через обмен ссылками. Почему нельзя устроить?
    * Инициатор формирует ссылку со своими данными SDP, ICE (предварительно может использовать STUN сервер)
    * Инициатор ожидает подключения
    * Получатель переходит по ссылке формирует подключение по переданным данным к Инициатору и передает свои данные SDP, ICE
    * Инициатор получает подключение к Получателю
    * Общаются!

# Ресурсы
* Репозиторий 
    * https://github.com/webrtc - организации https://webrtc.org
* Медиа-возможности HTML5. WebRTC  
    * https://www.youtube.com/watch?v=_gZXYjlBfnw
    * https://www.slideshare.net/oelifantiev/webrtc-47460817
    * Захват аудио и видео https://www.html5rocks.com/en/tutorials/getusermedia/intro/
    * https://trueconf.ru/webrtc.html
	* https://habrahabr.ru/company/Voximplant/blog/334498/
	* https://webrtc.org/
* Курсы
    * Introduction to WebRTC 
    * Материалы https://resources.oreilly.com/examples/0636920040279/
* Библиотеки 
    * Адаптер от google от префиксов вендеров https://github.com/webrtc/adapter
    * SDP
        * Парсер https://github.com/clux/sdp-transform
        * Преобразование SDP разных типов https://github.com/jitsi/sdp-interop
    * Simulcast 
        * https://github.com/medooze/media-server-node

# Применение технологии

## Screen Sharing
* Стандартом не поддерживается
* Можно захватывать без расширений, но Chrome требуется запускать с флагами. При этом возможность захвата 
будет доступна всем вкладкам.
* Реализуется как 
    * захват видело рабочего стола (или части) с помощью расширения для браузера.
    * Передача полученного потока в через DataChanel p2p соединения
        * Можно ли через передачу медиа данных?

# Web Audio API
* Пример
    * http://webaudioplayground.appspot.com/
* Можно сгенерить свой и отправить
* Можно отправить файл

# Web Video API
* Примеры преобразования
    * https://github.com/idevelop/ascii-camera
    * https://github.com/auduno/headtrackr
* Видео никак не сгенерить, не отправить свое

# Data Transfer API
* Возможность указать стабильность канала (гарантированность доставки), reliable
    * не стабильная быстрей, но могут терятся ппакеты. это приемлимо например для показа рабочего стола
    * стабильная медленней, но поток не портится, что важно при передаче файлов
* API похоже на socket
* В отличии от socket зашифрованное
* Не требует от браузера разрешений
* Отправка файла
    * Отдельная отправка меты файла (имени, размера) через socket
    * Передача через DT частей файла (16к), склейка при получении в буфер, создание файла при окончании из буфера и меты.
    

# Браузеры

## IE
* Использует свой вариант стандарта ORCT
* Можно обойти через ActiveX подключив WebRTC

## Разрешения
* API не работает со страницей из файловой структуры для безопасности
* http сайты каждый раз, для https запоминает выбор
## Инструменты
* chrome
    * chrome://webrtc-logs/
    * chrome://webrtc-internals/
* opera
    * chrome://webrtc-internals/
* firefox
    * about:webrtc

* API 
    * ! Новое API navigator.mediaDevices 
        * https://developer.mozilla.org/ru/docs/Web/API/MediaDevices
    * getUserMedia 
        * constraint - у разных браузеров разное
            * audio 
            * video
            * какую камеру фронт/бек
            * fps
            * прочее

    * constraint
        * resolution https://webrtchacks.com/video-constraints-2/
        * 
    * получение устройств https://simpl.info/getusermedia/sources/
    * Mute/unmute видео, аудио. 
        * получение всех потоков, в каждом получение всех тректов (аудио/видео). 
        * Установка им enable false/true
    * MediaStream
        * В основном получение/добавление потоков, события с этим связанные, свойства состояния
    * MediaTrack
        * Установка/получение ограничений
        * стояния трека
        * тип
        * включение/выключение
