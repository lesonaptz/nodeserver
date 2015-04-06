var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var rooms = [];
app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    
    socket.on('join', function(data){
        socket.join(data.room);
        io.sockets.in(data.room).emit("update", data.name + " has connected this room");
    });
    
    socket.on('creatRoom', function(room){
        rooms.push(room);
        io.sockets.emit("updateroom", rooms);
        
    });
     socket.on('loadroom', function(){
        io.sockets.emit("updateroom", rooms);
    });
    
    socket.on('sendmsg', function(data){
        socket.join(data.room);
        io.sockets.in(data.room).emit("updatemsg", {name:data.name, msg:data.msg});
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});