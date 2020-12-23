"use strict";
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// const allowUrl = require('config').get('allowUrl')
// const allowImageExtensions = require('config').get('allowExt')

// let imageExtensions = allowImageExtensions.replace(/^'(.*)'$/, '$1');
// let whitelist = allowUrl.replace(/^'(.*)'$/, '$1');

// imageExtensions = imageExtensions.replace(/'/g, '"');
// whitelist = whitelist.replace(/'/g, '"');

// imageExtensions = JSON.parse(imageExtensions);
// whitelist = JSON.parse(whitelist);


const configure = async (app, logger) => {
  const log = logger.start("settings:express:configure");
  app.use(bodyParser.json());
  app.use(cors());

  // app.use(cors({
  //   origin: function (origin, callback) {
  //     let isDomainAllowed = whitelist.indexOf(origin) === -1
  //     if (isDomainAllowed) {
  //       return callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'), false)
  //     }
  //     // return callback(null, true);
  //   }
  // }));
  // app.use(cors);
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(
    bodyParser({
      limit: "50mb",
      keepExtensions: true
    })
  );

  const root = path.normalize(__dirname + "./../");
  app.use(express.static(path.join(root, "public")));
  log.end();
};

exports.configure = configure;
