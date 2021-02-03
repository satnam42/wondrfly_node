"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
// const Http = require("http");
const Https = require("https");
const fs = require('fs');
const port = process.env.PORT || appConfig.port || 3000;
const path = require('path');
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');

// var admin = require("firebase-admin");
// var serviceAccount = require("./firebase-truckapp.json");
const app = express();
// app.use((err, req, res, next) => {
//     if (err) {
//         (res.log || log).error(err.stack)
//         return res.send(500, {
//             error: 'something blew up!'
//         })
//     }
//     next();
// })

// Define the static file path
app.use(express.static(__dirname + '/public'));


const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/bacca.store/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/bacca.store/privkey.pem')
};
var server = Https.createServer(options, app);
// var server = Http.createServer(app);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./communication/chat.js').sockets(server);

const boot = () => {
  const log = logger.start("app:boot");
  log.info(`environment:  ${process.env.NODE_ENV}`);
  log.info("starting server");
  server.listen(port, () => {
    log.info(`listening on port: ${port}`);
    log.end();
  });
};

const init = async () => {
  await require("./settings/database").configure(logger);
  await require("./settings/express").configure(app, logger);
  await require("./settings/routes").configure(app, logger);

  boot();
};
init();
