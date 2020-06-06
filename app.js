"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
const port = process.env.PORT || appConfig.port || 3000;
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

var server = Http.createServer(app);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

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
