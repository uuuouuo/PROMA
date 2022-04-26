<!doctype html>
<html lang="en">
<head>
    <title>Websocket ChatRoom</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/webjars/bootstrap/4.3.1/dist/css/bootstrap.min.css">
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div class="container" id="app" v-cloak>
    <div>
        <h2>개인 채팅방</h2>
    </div>
    <div class="input-group">
        <div class="input-group-prepend">
            <label class="input-group-text">내용</label>
        </div>
        <input type="text" class="form-control" v-model="content" v-on:keypress.enter="sendMessage">
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
        </div>
    </div>
    <ul class="list-group">
        <li class="list-group-item" v-for="message in messages">
            {{message.nickname}} - {{message.content}} {{message.time}}</a>
        </li>
    </ul>
    <div></div>
</div>
<!-- JavaScript -->
<script src="/webjars/vue/2.5.16/dist/vue.min.js"></script>
<script src="/webjars/axios/0.17.1/dist/axios.min.js"></script>
<script src="/webjars/sockjs-client/1.1.2/sockjs.min.js"></script>
<script src="/webjars/stomp-websocket/2.3.3-1/stomp.min.js"></script>
<script>
    //alert(document.title);
    // websocket & stomp initialize
    // var sock = new SockJS("/ws-stomp");
    var sock = new SockJS("http://k6c107.p.ssafy.io:8080/ws-stomp");
    var ws = Stomp.over(sock);
    var reconnect = 0;
    // vue.js
    var vm = new Vue({
        el: '#app',
        data: {
            roomNo: '',
            pubNo: '',
            content: '',
            messages: []
        },
        created() {
            this.roomNo = "${roomNo}";
            this.pubNo = "${userNo}";
            // this.findRoom();
        },
        methods: {
            findRoom: function() {
                axios.get('/chat/room/'+this.roomNo).then(response => { this.room = response.data; });
                // axios.get('http://j6c103.p.ssafy.io:8081/chat2/room/'+this.roomId).then(response => { this.room = response.data; });
            },
            sendMessage: function() {
                ws.send("/pub/chat/private-msg", {}, JSON.stringify({roomNo:this.roomNo, pubNo:this.pubNo, content:this.content}));
                this.message = '';
            },
            recvMessage: function(recv) {
                this.messages.unshift({"nickname":recv.nickname,"content":recv.content, "time":recv.time})
            }
        }
    });

    function connect() {
        // pub/sub event
        ws.connect({}, function(frame) {
            ws.subscribe("/sub/chat/room/user/"+vm.$data.roomNo, function(message) {
                var recv = JSON.parse(message.body);
                vm.recvMessage(recv);
            });
            // ws.send("/pub/chat/message", {}, JSON.stringify({roomNo:vm.$data.roomNo, pubNo:vm.$data.pubNo}));
        }, function(error) {
            if(reconnect++ <= 5) {
                setTimeout(function() {
                    console.log("connection reconnect");
                    // sock = new SockJS("/ws-stomp");
                    sock = new SockJS("k6c107.p.ssafy.io:8080/ws-stomp");
                    ws = Stomp.over(sock);
                    connect();
                },10*1000);
            }
        });
    }
    connect();
</script>
</body>
</html>