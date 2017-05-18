var express = require('express');
var app = express();
app.use(express.static('client'));
app.get('/', function (req, res){
    res.sendfile(__dirname + '/client/index.html');
});
app.get('/blog', function (req, res){
    res.sendFile(__dirname + '/client/blog.html');
})
app.get('/post', function (req, res){
    res.sendFile(__dirname + '/client/post.html');
})

console.log(process.env.IP + ":" + process.env.PORT)
app.listen(process.env.PORT, process.env.IP);