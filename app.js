/**
 * Created by evanz on 2016/7/5.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var router = require('./router/router');
var session = require('express-session');

//session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//模板及静态资源
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//注册登录业务
app.get('/', router.showIndex);
app.get('/regist', router.showRegist);
app.get('/chat', router.showChat);
app.get('/exit', router.doExit);
app.post('/doregist', router.doRegist);
app.post('/dologin', router.doLogin);

//chat参数
var serverlist = {},
    userlist = [];

//聊天业务
io.on('connection', function (socket) {
    //服务器监听新用户发送的请求
    socket.on('newuser', function (data) {
        //用户登入后将其加入用户列表中
        userlist.push(data.username);
        //将用户名和角标保存在socket中，方便disconnect时删除
        socket.username = data.username;
        socket.index = userlist.length - 1;
        //将该用户的server服务加入队列中等待别人来叫他~
        serverlist[data.username] = socket;
        //全体广播当前在线的用户列表
        io.emit('onlineuser', {users: userlist});
    });
    //用户离开时执行
    socket.on('disconnect', function () {
        //清空用户列表及服务列表
        userlist.splice(socket.index,1);
        delete serverlist[socket.username];
        //广播用户列表
        io.emit('onlineuser', {users: userlist});
    });
    //发送信息
    socket.on('message',function(data){
        console.log(data);
        //判断用户列表中是否存在该用户
        if(serverlist.hasOwnProperty(data.to)){
            serverlist[data.to].emit('getMsg',{msg:data.msg})
        }else{
            socket.emit("err",{msg:"对方已经下线"})
        }
    })
});

//总页面端口
app.listen(3000, function () {
    console.log('服务器成功开启');
});

//聊天端口
server.listen(8888, function () {
    console.log('聊天端口监听成功')
});