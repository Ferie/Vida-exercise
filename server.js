var express = require('express');
var localhost = express();

//*** Configuration ***//
// Set your main file here
var mainFile = '/index.html';

// Set your available localhost port here
var localhostPort = 9010;

// Start the server and manage a mod rewrite that forward to specified page
localhost.use(express.static(__dirname));

localhost.get(/.*/, function (req, res) {
    res.sendFile(__dirname + mainFile);
});

localhost.listen(localhostPort, function () {
    console.log("Start surfing at localhost:%d", localhostPort);
});

localhost.post('api/sessions', function (req, res) {
    var username = req.param('email');
    var password = req.param('password');
    if (username == 'email' && password == 'password') {
        return res.send('Logged!');
    }
    return res.status(403).send('Username and password not valid!');
});
