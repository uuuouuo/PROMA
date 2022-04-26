<!doctype html>
<html lang="en">
<head>
    <title>Websocket Notification</title>
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
        <h2>${userNo} 님의 알림 목록입니당</h2>
    </div>
<#--    <ul class="list-group">-->
<#--        <li class="list-group-item" v-for="notification in notifications">-->
<#--            {{{notification.message}}</a>-->
<#--        </li>-->
<#--    </ul>-->
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
            userNo: '',
            notifications: []
        },
        created() {
            this.userNo = "${userNo}"
            this.messages.unshift({"message":"알림 시작"})
            this.getNotifications();
        },
        methods: {
            getNotifications: function (){
                //이전 알림 목록 받아오기 -> 나중에..
            },
            recvMessage: function(recv) {
                alert("알림 : " + recv.message)
                this.notifications.unshift({"message":recv.message})
            }
        }
    });

    function connect() {
        // pub/sub event
        ws.connect({}, function(frame) {
            ws.subscribe("/queue/notification/"+vm.$data.userNo, function(message) {
                var recv = JSON.parse(message.body);
                vm.recvMessage(recv);
            });
            // ws.send("/queue/notification", {}, JSON.stringify({}));
        }, function(error) {
            if(reconnect++ <= 5) {
                setTimeout(function() {
                    console.log("connection reconnect");
                    // sock = new SockJS("/ws-stomp");
                    sock = new SockJS("http://k6c107.p.ssafy.io:8080/ws-stomp");
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