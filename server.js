var express = require('express');
var app = express();
app.use(express.static('client'));
app.get('/', function (req, res){
    res.sendfile(__dirname + '/client/index.html');
});
app.get('/CIS240', function (req, res){
    res.sendFile(__dirname + '/240/cis240.html');
})
app.listen(process.env.PORT, process.env.IP);