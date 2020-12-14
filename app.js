"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
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


var server = Http.createServer(app);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/resetPassword/:token', function (req, res) {

  res.sendFile(path.join(__dirname + '/emailTemplates/index.html'));
})

app.post("/resetPassword/:token", async function (req, res) {
  const { Password } = req.body;
  if (!Password) {
    return res.status(400).json({
      status: false,
      message: "Password is required!",
    });
  } else {

    async function resetPassword(user) {
      user.password = bcrypt.hashSync(Password, 10);
      user.updatedOn = new Date();
      await user.save()
      return res.json({
        status: 200,
        message: "Password changed successfully",
      });
    }
    db.user.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    }).then((user) => {
      if (!user) {
        throw new Error("otpVerifyToken is wrong or expired.");
      }
      resetPassword(user);
    })
      .catch((err) => {
        return res.json({
          status: "error",
          // message: "Token Expired!!!",
          message: err.message,
        });
      })
  };
});

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
