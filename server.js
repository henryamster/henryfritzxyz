var express = require('express');
var app = express();
app.use(express.static('client'));
app.get('/', function (req, res){
    res.sendfile(__dirname + '/client/index.html');
});
app.listen(process.env.PORT, process.env.IP);