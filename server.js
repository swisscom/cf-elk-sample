var winston = require('winston');
var express = require('express');
// 
// Requiring `winston-logstash` will expose 
// `winston.transports.Logstash` 
// 
require('winston-logstash');

var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv()
var serviceEnv = appEnv.getService("testelk")

winston.add(winston.transports.Logstash, {
	port: serviceEnv.credentials.logstashPort,
	node_name: 'exampleApp',
	host: serviceEnv.credentials.logstashHost
});

var app = express();

app.get('/', function (req, res) {
  winston.info('Hello World!');
  winston.info(req.headers);
  res.send('Hello World!');
})

app.get('/blocked', function (req, res) {
	winston.info(req.headers);
	res.status(401).send('Something blocked!');
  	res.send('Got a GET request at /user');
});

app.get('/broke', function (req, res) {
	winston.info(req.headers);
	res.status(500).send('Something broke!');	
});

var server = app.listen(process.env.PORT || 3000, function () {

  var port = server.address().port;

  winston.info('Example app listening at port %s', port);

});