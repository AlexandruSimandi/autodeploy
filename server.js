var express = require('express')
var app = express()
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var fs = require("fs");
var contents = fs.readFileSync("config.json");
var config = JSON.parse(contents);

app.post(config.SECRET_ENDPOINT, (req, res) => {
    exec('./autodeploy.sh > .log', puts);
    res.status(200).send('ok');
    console.log('autodeploy script ran');
});

app.listen(5475, () => console.log('Auto deployer running on port 5475'))