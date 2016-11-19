'use strict';

const express = require('express');
const winston = require('winston');
const cfenv = require('cfenv');
//
// Requiring `winston-logstash` will expose
// `winston.transports.Logstash`
//

require('winston-logstash');

const app = express();

// get all Cloud Foundry environment variables
const appEnv = cfenv.getAppEnv();
// get credentials for service named "testelk"
const serviceEnv = appEnv.getService('testelk');

// configure Logstash connection
winston.add(winston.transports.Logstash, {
  port: serviceEnv.credentials.logstashPort,
  node_name: 'exampleApp',
  host: serviceEnv.credentials.logstashHost,
});

app.get('/', (req, res) => {
  // send headers on info level to elk
  winston.info(req.headers);
  // return HTTP 200 response
  res.send('Hello World!');
});

app.get('/blocked', (req, res) => {
  // send headers on warning level to elk
  winston.warn(req.headers);
  // return HTTP 401 response
  res.status(401).send('Something blocked!');
});

app.get('/broke', (req, res) => {
  // send headers on error level to elk
  winston.error(req.headers);
  // return HTTP 500 response
  res.status(500).send('Something broke!');
});

// use PORT from the environment or 3000 as a fallback
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('I am ready and listening on %d', port);
});
