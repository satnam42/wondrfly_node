"use strict";
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const allowUrl = require('config').get('allowUrl')
const allowImageExtensions = require('config').get('allowExt')

const whitelist = allowUrl

let imageExtensions = allowImageExtensions.replace(/^'(.*)'$/, '$1');

imageExtensions = imageExtensions.replace(/'/g, '"');

imageExtensions = JSON.parse(imageExtensions);

const corsOptionsDelegate = (req, callback) => {
  
  let corsOptions;

  let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

  let isExtensionAllowed = imageExtensions.some(imageExtension =>  req.path.endsWith(imageExtension))

  if (isDomainAllowed || isExtensionAllowed) {
      callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }

}

const configure = async (app, logger) => {
  const log = logger.start("settings:express:configure");
  app.use(bodyParser.json());
  app.use(cors(corsOptionsDelegate));
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
