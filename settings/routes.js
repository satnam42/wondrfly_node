"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const path = require("path");
const validator = require("../validators");
var multer = require('multer');

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    if (file.fieldname == 'csv') {
      cb(null, path.join(__dirname, '../', 'assets'));
    }
    else {
      cb(null, path.join(__dirname, '../', 'assets/images'));
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname == 'csv') {
      cb(null, file.originalname);
    }
    else {
      cb(null, Date.now() + file.originalname);
    }
  }
});

var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } });

const configure = (app, logger) => {
  const log = logger.start("settings:routes:configure");
  app.get("/specs", function (req, res) {
    fs.readFile("./public/specs.html", function (err, data) {
      if (err) {
        return res.json({
          isSuccess: false,
          error: err.toString()
        });
      }
      res.contentType("text/html");
      res.send(data);
    });
  });

  app.get("/api/specs", function (req, res) {
    res.contentType("application/json");
    res.send(specs.get());
  });
  // user routes
  app.post(
    "/api/users/register",
    permit.context.builder,
    validator.users.create,
    api.users.create
  );
  app.put(
    "/api/users/uploadProfilePic/:id",
    permit.context.requiresToken,
    upload.single('image'),
    api.users.uploadProfilePic
  );
  app.get(
    "/api/users/getById/:id",
    permit.context.requiresToken,
    validator.users.getById,
    api.users.getById
  );
  app.get(
    "/api/users/list",
    permit.context.builder,
    // validator.users.get,
    api.users.list
  );

  app.get(
    "/api/users/count",
    permit.context.requiresToken,
    // permit.context.builder,
    // validator.users.get,
    api.users.getCount
  );
  app.get(
    "/api/users/recentAdded",
    permit.context.requiresToken,
    // permit.context.builder,
    // validator.users.get,
    api.users.getRecentAdded
  );
  app.get(
    "/api/users/recentAddedByRole",
    permit.context.requiresToken,
    // permit.context.builder,
    // v0alidator.users.get,
    api.users.recentAddedByRole
  );
  app.put(
    "/api/users/update/:id",
    permit.context.requiresToken,
    validator.users.update,
    api.users.update
  );
  app.post(
    "/api/users/login",
    permit.context.builder,
    validator.users.login,
    api.users.login
  );
  app.post(
    "/api/users/logout",
    permit.context.builder,
    // validator.users.logout,
    api.users.logout
  );
  app.post(
    "/api/users/resetPassword",
    permit.context.requiresToken,
    validator.users.resetPassword,
    api.users.resetPassword
  );
  app.put(
    "/api/users/delete",
    permit.context.requiresToken,
    api.users.deleteUser
  );
  app.put(
    "/api/users/activeOrDeactive",
    permit.context.requiresToken,
    api.users.activeOrDeactive
  );
  app.get(
    "/api/users/otp",
    permit.context.builder,
    // permit.context.requiresToken,
    api.users.sendOtp
  );
  app.post(
    "/api/users/otpVerify",
    permit.context.builder,
    api.users.otpVerify
  );
  app.post(
    "/api/users/forgotPassword",
    permit.context.builder,
    validator.users.forgotPassword,
    api.users.forgotPassword
  );
  //entity routes//
  // app.post(
  //   "/api/entities/add",
  //   permit.context.requiresToken,
  //   api.entities.create
  // );
  // app.get(
  //   "/api/entities/list",
  //   permit.context.requiresToken,
  //   api.entities.list
  // );
  //category routes//
  app.post(
    "/api/categories/add",
    permit.context.requiresToken,
    api.categories.create
  );
  app.get(
    "/api/categories/list",
    permit.context.requiresToken,
    api.categories.list
  );
  app.get(
    "/api/categories/search",
    permit.context.builder,
    permit.context.requiresToken,
    api.categories.search
  );
  app.put(
    "/api/categories/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.categories.update
  );

  //tag routes //
  app.post(
    "/api/tags/add",
    permit.context.requiresToken,
    api.tags.create
  );
  app.get(
    "/api/tags/list",
    permit.context.requiresToken,
    api.tags.list
  );

  app.put(
    "/api/tags/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.tags.update
  );

  //permission routes //

  app.post(
    "/api/permissions/addPermissionsType",
    permit.context.requiresToken,
    // validator.permissions.assign,
    api.permissions.create
  );
  app.post(
    "/api/permissions/assign",
    permit.context.requiresToken,
    validator.permissions.assign,
    api.permissions.assignPermission
  );
  app.put(
    "/api/permissions/delete",
    permit.context.requiresToken,
    validator.permissions.deletePermission,
    api.permissions.deletePermission
  );
  app.get(
    "/api/permissions/typeList",
    permit.context.requiresToken,
    api.permissions.list
  );
  // provider routes //
  app.post(
    "/api/providers/import",
    permit.context.requiresToken,
    upload.single('csv'),
    api.providers.create
  );
  app.get(
    "/api/providers/list",
    permit.context.requiresToken,
    api.providers.list
  );
  app.put(
    "/api/providers/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.update
  );
  //review routes//
  app.post(
    "/api/reviews/add",
    permit.context.requiresToken,
    api.reviews.create
  );
  app.get(
    "/api/reviews/byProgramId",
    permit.context.requiresToken,
    api.reviews.reviewsByProgramId
  );

  app.put(
    "/api/reviews/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.reviews.update
  );
  //parent routes//
  app.post(
    "/api/parents/add",
    permit.context.requiresToken,
    api.parents.add
  );
  app.put(
    "/api/parents/update/:id",
    permit.context.requiresToken,
    api.parents.update
  );
  // app.put(
  //   "/api/parents/delete",
  //   permit.context.requiresToken,
  //   api.parents.deleteParent
  // );
  // app.put(
  //   "/api/parents/activeOrDeactive",
  //   permit.context.requiresToken,
  //   api.parents.activeOrDeactive
  // );
  // app.post(
  //   "/api/parents/uploadProfilePic",
  //   permit.context.requiresToken,
  //   upload.single('image'),
  //   api.parents.uploadProfilePic
  // );
  app.get(
    "/api/parents/list",
    permit.context.builder,
    // validator.users.get,
    api.parents.list
  );
  //parent routes//
  app.post(
    "/api/child/add",
    permit.context.requiresToken,
    api.child.add
  );
  app.get(
    "/api/child/list",
    permit.context.requiresToken,
    api.child.list
  );
  app.put(
    "/api/child/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.child.update
  );
  log.end();
};

exports.configure = configure
