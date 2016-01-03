var express = require('express'); // Webframework for nodejs, quite powerfull
var app = express(); 

var winston = require('winston');
// 
// Requiring `winston-logstash` will expose 
// `winston.transports.Logstash` 
// 
require('winston-logstash');

var cfenv = require("cfenv")
var appEnv = cfenv.getAppEnv() // get all Cloud Foundry Environment variables
var serviceEnv = appEnv.getService("testelk") // get Credentials for Service named "testelk"

// configure Logstash connection
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
	winston.warn(req.headers);
	res.status(401).send('Something blocked!');
});

app.get('/broke', function (req, res) {
	winston.error(req.headers);
	res.status(500).send('Something broke!');	
});

var port = process.env.PORT || 3000 // either use the port 3000 or a port which is in the "environment variable" - the cloud will deliver us such a port 
app.listen(port); // tell nodejs to listen to this port and give response
 
console.log('I am ready and listening on %d', port); // write something nice to the console
