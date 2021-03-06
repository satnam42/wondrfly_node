"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const path = require("path");
const validator = require("../validators");
var multer = require('multer');
try {
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
} catch (err) {
  console.log('errrrrrrrrr', err)

}


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
    permit.context.builder,
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
  app.put(
    "/api/users/resetPassword/:id",
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
  app.post(
    "/api/users/tellAFriend",
    permit.context.builder,
    validator.users.tellAFriend,
    api.users.tellAFriend
  );
  app.post(
    "/api/users/feedback",
    permit.context.builder,
    validator.users.feedback,
    api.users.feedback
  );
  app.get(
    "/api/users/getProfileProgress",
    permit.context.builder,
    api.users.getProfileProgress
  );
  app.put(
    "/api/users/verifySecuirtyAns/:id",
    permit.context.requiresToken,
    api.users.verifySecuirtyAns
  );

  app.get(
    "/api/users/search",
    permit.context.requiresToken,
    api.users.search
  );

  ////////events routes//////////

  app.post(
    "/api/events/add",
    permit.context.requiresToken,
    validator.events.create,
    api.events.create
  );
  app.get(
    "/api/events/listByUserId/:id",
    permit.context.requiresToken,
    api.events.listByUserId
  );
  app.get(
    "/api/events/list",
    permit.context.requiresToken,
    api.events.list
  );
  app.put(
    "/api/events/update/:id",
    permit.context.requiresToken,
    api.events.update
  );

  app.delete(
    "/api/events/delete/:id",
    permit.context.requiresToken,
    api.events.remove
  );

  //category routes//
  app.post(
    "/api/categories/add",
    permit.context.requiresToken,
    api.categories.create
  );
  app.get(
    "/api/categories/list",
    permit.context.builder,
    // permit.context.requiresToken,
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
  app.put(
    "/api/categories/uploadPic/:id",
    permit.context.requiresToken,
    upload.single('image'),
    api.categories.uploadPic
  );
  app.delete(
    "/api/categories/delete/:id",
    permit.context.requiresToken,
    api.categories.remove
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
  app.get(
    "/api/tags/byCategoryId",
    permit.context.requiresToken,
    api.tags.tagByCategoryId
  );

  app.put(
    "/api/tags/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.tags.update
  );
  app.get(
    "/api/tags/search",
    permit.context.builder,
    permit.context.requiresToken,
    api.tags.search
  );
  app.delete(
    "/api/tags/remove/:id",
    permit.context.builder,
    permit.context.requiresToken,
    api.tags.remove
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
    "/api/providers/add",
    permit.context.builder,
    permit.context.requiresToken,
    // upload.single('csv'),
    api.providers.add
  );
  app.post(
    "/api/providers/import",
    permit.context.builder,
    // permit.context.requiresToken,
    upload.single('csv'),
    api.providers.create
  );
  app.get(
    "/api/providers/list",
    permit.context.requiresToken,
    api.providers.list
  );
  app.get(
    "/api/providers/byEmialId",
    permit.context.requiresToken,
    api.providers.providerByEmailId
  );
  app.get(
    "/api/providers/search",
    permit.context.requiresToken,
    api.providers.searchProvider
  );
  app.put(
    "/api/providers/update/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.update
  );
  app.get(
    "/api/providers/getById/:id",
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.getById
  );

  app.get(
    "/api/providers/report",
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.report
  );

  app.get(
    "/api/providers/listByFilter",
    permit.context.requiresToken,
    api.providers.providersByFilter
  );

  app.get(
    "/api/providers/findDuplicate",
    permit.context.requiresToken,
    api.providers.dublicateProviders
  );
  app.post(
    "/api/providers/margeDuplicate",
    permit.context.requiresToken,
    api.providers.margeDublicateProviders
  );

  app.put(
    "/api/providers/uploadBannerPic/:id",
    permit.context.requiresToken,
    upload.array('image', 5),
    api.providers.uploadBannerPic
  );

  app.get(
    "/api/providers/getProvidersByDate",
    permit.context.builder,
    // validator.users.get, 
    api.providers.getProvidersByDate
  );

  app.post(
    "/api/providers/govtId",
    // permit.context.builder,
    permit.context.requiresToken,
    api.providers.govtId
  );

  app.post(
    "/api/providers/deletePhoneNumber",
    permit.context.requiresToken,
    api.providers.deletePhoneNumber
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
  app.get(
    "/api/parents/getById/:id",
    permit.context.requiresToken,
    api.parents.get
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
    api.parents.list
  );
  //child routes//
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
    api.child.update
  );
  app.get(
    "/api/child/byParentId/:id",
    permit.context.requiresToken,
    api.child.childByParentId
  );
  app.put(
    "/api/child/delete/:id",
    permit.context.requiresToken,
    api.child.deleteChild
  );

  //guardian routes
  app.post(
    "/api/guardians/add",
    permit.context.builder,
    api.guardians.add
  );
  app.get(
    "/api/guardians/list",
    permit.context.requiresToken,
    api.guardians.list
  );
  app.put(
    "/api/guardians/update/:id",
    permit.context.requiresToken,
    api.guardians.update
  );
  app.get(
    "/api/guardians/byParentId/:id",
    permit.context.requiresToken,
    api.guardians.getGuardianByParentId
  );
  app.delete(
    "/api/guardians/remove/:id",
    permit.context.requiresToken,
    api.guardians.remove
  );
  app.post(
    "/api/guardians/sendOtp",
    permit.context.builder,
    // permit.context.requiresToken,
    api.guardians.sendOtp
  );

  //program routes//
  app.post(
    "/api/programs/add",
    permit.context.requiresToken,
    api.programs.create
  );
  app.put(
    "/api/programs/update/:id",
    permit.context.requiresToken,
    api.programs.update
  );
  app.get(
    "/api/programs/getById/:id",
    permit.context.builder,
    api.programs.getById
  );
  app.get(
    "/api/programs/list",
    permit.context.builder,
    api.programs.list
  );
  app.delete(
    "/api/programs/delete/:id",
    permit.context.requiresToken,
    api.programs.remove
  );
  app.put(
    "/api/programs/uploadTimeLinePics/:id",
    permit.context.requiresToken,
    upload.array('image', 5),
    api.programs.uploadTimelinePics
  );
  app.get(
    "/api/programs/search",
    permit.context.builder,
    // permit.context.requiresToken,
    api.programs.search
  );
  app.get(
    "/api/programs/byProvider",
    permit.context.builder,
    api.programs.programsByProvider
  );
  app.post(
    "/api/programs/addProgramAction",
    permit.context.requiresToken,
    api.programs.addProgramAction
  );
  app.get(
    "/api/programs/count",
    permit.context.requiresToken,
    api.programs.programCountByUserId
  );
  app.get(
    "/api/programs/getViewsCount",
    permit.context.requiresToken,
    api.programs.viewsByUserId
  );

  app.put(
    "/api/programs/activeOrDecactive",
    permit.context.requiresToken,
    api.programs.activeOrDecactive
  );
  app.get(
    "/api/programs/getGraphData",
    permit.context.builder,
    permit.context.requiresToken,
    api.programs.graphData
  );

  app.get(
    "/api/programs/byFilter",
    permit.context.builder,
    permit.context.builder,
    api.programs.filter
  );

  app.post(
    "/api/programs/import",
    permit.context.builder,
    // permit.context.requiresToken,
    upload.single('csv'),
    api.programs.importProgram
  );

  app.get(
    "/api/programs/getProgramsByDate",
    permit.context.builder,
    // validator.users.get, 
    api.programs.getProgramsByDate
  );

  app.get(
    "/api/programs/publishedOrUnPublishedPrograms",
    permit.context.requiresToken,
    api.programs.publishedOrUnPublishedPrograms
  );

  app.get(
    "/api/programs/openPrograms",
    permit.context.builder,
    api.programs.openPrograms
  );

  app.put(
    "/api/programs/publish",
    permit.context.requiresToken,
    api.programs.publish
  );

  app.get(
    "/api/programs/listPublishOrUnpublish",
    permit.context.builder,
    api.programs.listPublishOrUnpublish
  );

  app.get(
    "/api/programs/searchByNameAndDate",
    permit.context.builder,
    api.programs.searchByNameAndDate
  );


  //=============favourites api=====================//
  app.post(
    "/api/favourites/add",
    permit.context.requiresToken,
    api.favourites.create
  );

  app.get(
    "/api/favourites/getByParentId",
    permit.context.builder,
    api.favourites.listByUserId
  );

  app.delete(
    "/api/favourites/delete/:id",
    permit.context.requiresToken,
    api.favourites.remove
  );

  // uploads api//
  app.post(
    "/api/uploads/getPicUrl",
    permit.context.requiresToken,
    upload.single('image'),
    api.uploads.getPicUrl
  );

  // claims api//
  app.post(
    "/api/claims/request",
    permit.context.requiresToken,
    api.claims.request
  );

  app.get(
    "/api/claims/requestList",
    permit.context.requiresToken,
    api.claims.requestList
  );

  app.get(
    "/api/claims/requestListByProvider",
    permit.context.requiresToken,
    api.claims.requestListByProvider
  );

  app.put(
    "/api/claims/action/:id",
    permit.context.requiresToken,
    api.claims.action
  );

  // post api//
  app.post(
    "/api/posts/create",
    permit.context.requiresToken,
    validator.posts.create,
    api.posts.create
  );

  app.get(
    "/api/posts/list",
    permit.context.requiresToken,
    api.posts.list
  );

  app.get(
    "/api/posts/byId/:id",
    permit.context.requiresToken,
    api.posts.getById
  );

  app.get(
    "/api/posts/byUser/:id",
    permit.context.requiresToken,
    api.posts.postsByUserId
  );
  app.get(
    "/api/posts/byTagId/:id",
    permit.context.requiresToken,
    api.posts.postsByTagId
  );

  app.put(
    "/api/posts/update/:id",
    permit.context.requiresToken,
    api.posts.update
  );

  app.put(
    "/api/posts/remove/:id",
    permit.context.requiresToken,
    api.posts.remove
  );

  app.put(
    "/api/posts/increaseView/:id",
    permit.context.requiresToken,
    api.posts.increaseView
  );

  app.get(
    "/api/posts/search",
    permit.context.requiresToken,
    api.posts.search
  );

  app.get(
    "/api/posts/postsByRole",
    permit.context.requiresToken,
    api.posts.postsByRole
  );
  // commment api//
  app.post(
    "/api/comments/create",
    permit.context.requiresToken,
    validator.comments.create,
    api.comments.create
  );

  app.put(
    "/api/comments/update/:id",
    permit.context.requiresToken,
    api.comments.update
  );

  app.put(
    "/api/comments/remove/:id",
    permit.context.requiresToken,
    api.comments.remove
  );

  app.get(
    "/api/comments/getById/:id",
    permit.context.requiresToken,
    api.comments.getById
  );
  // likes api//
  app.post(
    "/api/likes/like",
    permit.context.requiresToken,
    validator.likes.create,
    api.likes.add
  );

  app.put(
    "/api/likes/unLikes",
    permit.context.requiresToken,
    api.likes.remove
  );

  // =========ambassdor api's============
  app.post(
    "/api/ambassador/addOrRemove",
    permit.context.requiresToken,
    api.ambassador.addOrRemove
  );
  app.get(
    "/api/ambassador/getAmbassadors",
    permit.context.requiresToken,
    // permit.context.builder,
    api.ambassador.getAmbassadors
  );

  app.post(
    "/api/ambassador/addActivities",
    permit.context.requiresToken,
    api.ambassador.addActivities
  );

  app.get(
    "/api/ambassador/getActivities",
    permit.context.requiresToken,
    api.ambassador.getActivities
  );

  app.post(
    "/api/ambassador/addActivityPoint",
    permit.context.requiresToken,
    api.ambassador.addActivityPoint
  );

  app.delete(
    "/api/ambassador/deleteActivity/:id",
    permit.context.requiresToken,
    api.ambassador.deleteActivity
  );

  app.put(
    "/api/ambassador/updateActivity/:id",
    permit.context.builder,
    // validator.users.updateActivity, 
    api.ambassador.updateActivity
  );
  // =========Alert api's============
  app.post(
    "/api/alert/create",
    permit.context.requiresToken,
    api.alert.create
  );
  app.get(
    "/api/alert/list",
    permit.context.requiresToken,
    // permit.context.builder,
    api.alert.list
  );
  app.delete(
    "/api/alert/deleteAlert/:id",
    permit.context.requiresToken,
    api.alert.deleteAlert
  );

  app.put(
    "/api/alert/update",
    permit.context.requiresToken,
    api.alert.update
  );
  app.get(
    "/api/alert/showAlert",
    // permit.context.requiresToken,
    permit.context.builder,
    api.alert.showAlert
  );
  app.put(
    "/api/alert/deactivateAlert",
    permit.context.requiresToken,
    api.alert.deactivateAlert
  );

  // ==============Badges api's==============
  app.post(
    "/api/badges/create",
    permit.context.requiresToken,
    api.badges.create
  );
  app.get(
    "/api/badges/list",
    permit.context.builder,
    api.badges.list
  );
  app.delete(
    "/api/badges/deleteBadge/:id",
    permit.context.requiresToken,
    api.badges.deleteBadge
  );

  app.put(
    "/api/badges/update",
    permit.context.requiresToken,
    api.badges.update
  );

  // =========Feature api's============
  app.post(
    "/api/feature/create",
    permit.context.requiresToken,
    api.feature.create
  );
  app.get(
    "/api/feature/list",
    permit.context.requiresToken,
    // permit.context.builder,
    api.feature.list
  );
  app.delete(
    "/api/feature/deleteFeature/:id",
    permit.context.requiresToken,
    api.feature.deleteFeature
  );
  app.put(
    "/api/feature/update/:id",
    permit.context.requiresToken,
    api.feature.update
  );
  app.get(
    "/api/feature/getById/:id",
    permit.context.requiresToken,
    api.feature.getById
  );

  // =========Plans api's============
  app.post(
    "/api/plans/create",
    permit.context.requiresToken,
    api.plans.create
  );
  app.get(
    "/api/plans/list",
    permit.context.requiresToken,
    // permit.context.builder,
    api.plans.list
  );
  app.get(
    "/api/plans/getById/:id",
    permit.context.requiresToken,
    api.plans.getById
  );
  app.put(
    "/api/plans/update/:id",
    permit.context.requiresToken,
    api.plans.update
  );
  app.delete(
    "/api/plans/remove/:id",
    permit.context.requiresToken,
    api.plans.remove
  );
  app.put(
    "/api/plans/updateStatus/:id",
    permit.context.requiresToken,
    api.plans.updateStatus
  );

  //============conversation api's===================
  app.get(
    '/api/conversations/getOldChat',
    permit.context.requiresToken,
    api.conversations.getOldChat
  )

  //============twilio api's===================
  app.post(
    "/api/twilio/sendOtpSMS",
    permit.context.requiresToken,
    api.twilio.sendOtpSMS
  );
  app.post(
    "/api/twilio/otpVerify",
    permit.context.builder,
    api.twilio.otpVerify
  );

  log.end();
};

exports.configure = configure;