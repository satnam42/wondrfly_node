'use strict';

const fs = require('fs');
const api = require('../api');
const specs = require('../specs');
const permit = require('../permit');
const path = require('path');
const validator = require('../validators');
var multer = require('multer');
try {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname == 'csv') {
        cb(null, path.join(__dirname, '../', 'assets'));
      } else {
        cb(null, path.join(__dirname, '../', 'assets/images'));
      }
    },
    filename: function (req, file, cb) {
      if (file.fieldname == 'csv') {
        cb(null, file.originalname);
      } else {
        cb(null, Date.now() + file.originalname);
      }
    },
  });
  var upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 },
  });
} catch (err) {
  console.log('errrrrrrrrr', err);
}

const configure = (app, logger) => {
  const log = logger.start('settings:routes:configure');
  app.get('/specs', function (req, res) {
    fs.readFile('./public/specs.html', function (err, data) {
      if (err) {
        return res.json({
          isSuccess: false,
          error: err.toString(),
        });
      }
      res.contentType('text/html');
      res.send(data);
    });
  });

  app.get('/api/specs', function (req, res) {
    res.contentType('application/json');
    res.send(specs.get());
  });

  // user routes
  app.post(
    '/api/users/register',
    permit.context.builder,
    validator.users.create,
    api.users.create
  );
  app.put(
    '/api/users/uploadProfilePic/:id',
    permit.context.requiresToken,
    upload.single('image'),
    api.users.uploadProfilePic
  );
  app.get(
    '/api/users/getById/:id',
    permit.context.builder,
    validator.users.getById,
    api.users.getById
  );
  app.get(
    '/api/users/list',
    permit.context.builder,
    // validator.users.get,
    api.users.list
  );

  app.get(
    '/api/users/count',
    permit.context.requiresToken,
    // permit.context.builder,
    // validator.users.get,
    api.users.getCount
  );
  app.get(
    '/api/users/recentAdded',
    permit.context.requiresToken,
    // permit.context.builder,
    // validator.users.get,
    api.users.getRecentAdded
  );
  app.get(
    '/api/users/recentAddedByRole',
    permit.context.requiresToken,
    // permit.context.builder,
    // v0alidator.users.get,
    api.users.recentAddedByRole
  );
  app.put(
    '/api/users/update/:id',
    permit.context.requiresToken,
    validator.users.update,
    api.users.update
  );
  app.post(
    '/api/users/login',
    permit.context.builder,
    validator.users.login,
    api.users.login
  );
  app.post(
    '/api/users/logout',
    permit.context.builder,
    // validator.users.logout,
    api.users.logout
  );
  app.put(
    '/api/users/resetPassword/:id',
    permit.context.requiresToken,
    validator.users.resetPassword,
    api.users.resetPassword
  );
  app.put(
    '/api/users/delete',
    permit.context.requiresToken,
    api.users.deleteUser
  );
  app.put(
    '/api/users/activeOrDeactive',
    permit.context.requiresToken,
    api.users.activeOrDeactive
  );
  app.get(
    '/api/users/otp',
    permit.context.builder,
    // permit.context.requiresToken,
    api.users.sendOtp
  );
  app.post('/api/users/otpVerify', permit.context.builder, api.users.otpVerify);
  app.post(
    '/api/users/forgotPassword',
    permit.context.builder,
    validator.users.forgotPassword,
    api.users.forgotPassword
  );
  app.post(
    '/api/users/tellAFriend',
    permit.context.builder,
    validator.users.tellAFriend,
    api.users.tellAFriend
  );
  app.post(
    '/api/users/feedback',
    permit.context.builder,
    validator.users.feedback,
    api.users.feedback
  );
  app.get(
    '/api/users/getProfileProgress',
    permit.context.builder,
    api.users.getProfileProgress
  );
  app.put(
    '/api/users/verifySecuirtyAns/:id',
    permit.context.requiresToken,
    api.users.verifySecuirtyAns
  );

  app.get(
    '/api/users/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.users.search
  );
  app.post(
    '/api/users/facebook/login',
    permit.context.builder,
    api.users.facebookLogin
  );
  app.post(
    '/api/users/loginWithGoogle',
    permit.context.builder,
    api.users.loginWithGoogle
  );
  app.post('/api/users/contactUs', permit.context.builder, api.users.contactUs);
  app.put(
    '/api/users/removeProfilePic',
    permit.context.requiresToken,
    api.users.removeProfilePic
  );
  app.post(
    '/api/users/parentLoginFromAdmin/:id',
    permit.context.builder,
    api.users.parentLoginFromAdmin
  );
  // app.post(
  //   '/api/users/triggerEmail',
  //   permit.context.builder,
  //   api.users.triggerEmail
  // );

  ////////events routes//////////

  app.post(
    '/api/events/add',
    permit.context.requiresToken,
    validator.events.create,
    api.events.create
  );
  app.get(
    '/api/events/listByUserId/:id',
    permit.context.requiresToken,
    api.events.listByUserId
  );
  app.get('/api/events/list', permit.context.requiresToken, api.events.list);
  app.put(
    '/api/events/update/:id',
    permit.context.requiresToken,
    api.events.update
  );

  app.delete(
    '/api/events/delete/:id',
    permit.context.requiresToken,
    api.events.remove
  );

  //category routes//
  app.post(
    '/api/categories/add',
    permit.context.requiresToken,
    api.categories.create
  );
  app.get(
    '/api/categories/list',
    permit.context.builder,
    // permit.context.requiresToken,
    api.categories.list
  );
  app.get(
    '/api/categories/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.categories.search
  );
  app.put(
    '/api/categories/update/:id',
    permit.context.requiresToken,
    // validator.users.update,
    api.categories.update
  );
  app.put(
    '/api/categories/uploadPic/:id',
    permit.context.requiresToken,
    upload.single('image'),
    api.categories.uploadPic
  );
  app.delete(
    '/api/categories/delete/:id',
    permit.context.requiresToken,
    api.categories.remove
  );
  app.put(
    '/api/categories/activeOrDeactive',
    permit.context.requiresToken,
    api.categories.activeOrDeactive
  );
  app.put(
    '/api/categories/uploadIcon/:id',
    permit.context.requiresToken,
    upload.single('icon'),
    api.categories.uploadIcon
  );
  app.put(
    '/api/categories/uploadLogo/:id',
    permit.context.requiresToken,
    upload.single('logo'),
    api.categories.uploadLogo
  );
  app.put(
    '/api/categories/uploadPattern/:id',
    permit.context.requiresToken,
    upload.single('pattern'),
    api.categories.uploadPattern
  );

  //tag routes //
  app.post('/api/tags/add', permit.context.requiresToken, api.tags.create);
  app.get('/api/tags/list', permit.context.builder, api.tags.list);
  app.get(
    '/api/tags/byCategoryId',
    permit.context.builder,
    api.tags.tagByCategoryId
  );

  app.put(
    '/api/tags/update/:id',
    permit.context.requiresToken,
    api.tags.update
  );
  app.get('/api/tags/search', permit.context.builder, api.tags.search);
  app.delete(
    '/api/tags/remove/:id',
    permit.context.builder,
    permit.context.requiresToken,
    api.tags.remove
  );
  app.put(
    '/api/tags/activeOrDeactive',
    permit.context.requiresToken,
    api.tags.activeOrDeactive
  );
  app.put(
    '/api/tags/uploadImage/:id',
    permit.context.requiresToken,
    upload.single('image'),
    api.tags.uploadImage
  );
  app.put(
    '/api/tags/uploadIcon/:id',
    permit.context.requiresToken,
    upload.single('icon'),
    api.tags.uploadIcon
  );
  app.put(
    '/api/tags/uploadLogo/:id',
    permit.context.requiresToken,
    upload.single('logo'),
    api.tags.uploadLogo
  );
  app.put(
    '/api/tags/uploadPattern/:id',
    permit.context.requiresToken,
    upload.single('pattern'),
    api.tags.uploadPattern
  );
  app.get('/api/tags/searchTags', permit.context.builder, api.tags.searchTags);

  //permission routes //

  app.post(
    '/api/permissions/create',
    permit.context.requiresToken,
    // validator.permissions.assign ,
    api.permissions.create
  );
  app.post(
    '/api/permissions/assign',
    permit.context.requiresToken,
    validator.permissions.assign,
    api.permissions.assignPermission
  );
  app.put(
    '/api/permissions/delete',
    permit.context.requiresToken,
    validator.permissions.deletePermission,
    api.permissions.deletePermission
  );
  app.get(
    '/api/permissions/list',
    permit.context.requiresToken,
    api.permissions.list
  );
  // provider routes //
  app.post(
    '/api/providers/add',
    permit.context.builder,
    permit.context.requiresToken,
    // upload.single('csv'),
    api.providers.add
  );
  app.post(
    '/api/providers/import',
    permit.context.builder,
    // permit.context.requiresToken,
    upload.single('csv'),
    api.providers.create
  );
  app.get(
    '/api/providers/list',
    permit.context.requiresToken,
    api.providers.list
  );
  app.get(
    '/api/providers/byEmialId',
    permit.context.requiresToken,
    api.providers.providerByEmailId
  );
  app.get(
    '/api/providers/search',
    permit.context.requiresToken,
    api.providers.searchProvider
  );
  app.put(
    '/api/providers/update/:id',
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.update
  );
  app.get(
    '/api/providers/getById/:id',
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.getById
  );

  app.get(
    '/api/providers/report',
    permit.context.requiresToken,
    // validator.users.update,
    api.providers.report
  );

  app.get(
    '/api/providers/listByFilter',
    permit.context.requiresToken,
    api.providers.providersByFilter
  );

  app.get(
    '/api/providers/findDuplicate',
    permit.context.requiresToken,
    api.providers.dublicateProviders
  );
  app.post(
    '/api/providers/margeDuplicate',
    permit.context.requiresToken,
    api.providers.margeDublicateProviders
  );

  app.put(
    '/api/providers/uploadBannerPic/:id',
    permit.context.requiresToken,
    upload.array('image', 5),
    api.providers.uploadBannerPic
  );

  app.get(
    '/api/providers/getProvidersByDate',
    permit.context.builder,
    // validator.users.get,
    api.providers.getProvidersByDate
  );

  app.post(
    '/api/providers/govtId',
    // permit.context.builder,
    permit.context.requiresToken,
    api.providers.govtId
  );

  app.post(
    '/api/providers/deletePhoneNumber',
    permit.context.requiresToken,
    api.providers.deletePhoneNumber
  );

  app.get(
    '/api/providers/isVerifiedOrNot',
    permit.context.requiresToken,
    api.providers.isVerifiedOrNot
  );

  app.get(
    '/api/providers/searchVerifiedOrUnverified',
    permit.context.requiresToken,
    api.providers.searchVerifiedOrUnverified
  );

  app.get(
    '/api/providers/getRatingByUser/:id',
    permit.context.builder,
    // validator.users.update,
    api.providers.getRatingByUser
  );

  app.post(
    '/api/providers/uploadExcel',
    permit.context.builder,
    upload.single('csv'),
    api.providers.uploadExcel
  );

  app.get(
    '/api/providers/montclairProviders',
    permit.context.builder,
    api.providers.montclairProviders
  );
  app.get(
    '/api/providers/histogram',
    permit.context.builder,
    api.providers.histogram
  );
  app.post(
    '/api/providers/saveProvider',
    permit.context.requiresToken,
    api.providers.saveProvider
  );
  app.put(
    '/api/providers/freeTrail',
    permit.context.requiresToken,
    api.providers.freeTrail
  );
  app.get(
    '/api/providers/searchCreateModifiedDate',
    permit.context.builder,
    api.providers.searchCreateModifiedDate
  );
  app.get(
    '/api/providers/getByUsername/:username',
    permit.context.builder,
    // validator.users.update,
    api.providers.getByUsername
  );
  app.get(
    '/api/providers/activePrograms',
    permit.context.builder,
    api.providers.activePrograms
  );
  //review routes//
  app.post(
    '/api/reviews/add',
    permit.context.requiresToken,
    api.reviews.create
  );
  app.get(
    '/api/reviews/byProgramId',
    permit.context.requiresToken,
    api.reviews.reviewsByProgramId
  );
  app.put(
    '/api/reviews/update/:id',
    permit.context.requiresToken,
    // validator.users.update,
    api.reviews.update
  );
  //parent routes//
  app.post('/api/parents/add', permit.context.requiresToken, api.parents.add);
  app.put(
    '/api/parents/update/:id',
    permit.context.requiresToken,
    api.parents.update
  );
  app.get(
    '/api/parents/getById/:id',
    permit.context.requiresToken,
    api.parents.get
  );
  app.get(
    '/api/parents/searchByNameEmailStatus',
    permit.context.builder,
    api.parents.searchByNameEmailStatus
  );
  app.put(
    '/api/parents/createSearchHistory',
    permit.context.builder,
    api.parents.createSearchHistory
  );
  app.get(
    '/api/parents/getSearchHistory/:id',
    permit.context.builder,
    api.parents.getSearchHistory
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
  app.get('/api/parents/list', permit.context.builder, api.parents.list);
  app.get('/api/parents/getAll', permit.context.builder, api.parents.getAll);

  //child routes//
  app.post('/api/child/add', permit.context.requiresToken, api.child.add);
  app.get('/api/child/list', permit.context.requiresToken, api.child.list);
  app.put(
    '/api/child/update/:id',
    permit.context.requiresToken,
    api.child.update
  );
  app.get(
    '/api/child/byParentId/:id',
    permit.context.requiresToken,
    api.child.childByParentId
  );
  app.put(
    '/api/child/delete/:id',
    permit.context.requiresToken,
    api.child.deleteChild
  );
  app.get(
    '/api/child/byGuardianId/:id',
    permit.context.requiresToken,
    api.child.childByGuardianId
  );
  app.put(
    '/api/child/activeOrDeactive',
    permit.context.requiresToken,
    api.child.activeOrDeactive
  );
  app.put(
    '/api/child/removeProfilePic',
    permit.context.requiresToken,
    api.child.removeProfilePic
  );
  app.get(
    '/api/child/interestPrograms',
    permit.context.builder,
    api.child.interestPrograms
  );
  app.post(
    '/api/child/addMultiple',
    permit.context.requiresToken,
    api.child.addMultiple
  );


  //guardian routes
  app.post('/api/guardians/add', permit.context.builder, api.guardians.add);
  app.get(
    '/api/guardians/list',
    permit.context.requiresToken,
    api.guardians.list
  );
  app.put(
    '/api/guardians/update/:id',
    permit.context.requiresToken,
    api.guardians.update
  );
  app.get(
    '/api/guardians/byParentId/:id',
    permit.context.requiresToken,
    api.guardians.getGuardianByParentId
  );
  app.delete(
    '/api/guardians/remove/:id',
    permit.context.requiresToken,
    api.guardians.remove
  );
  // app.post(
  //   "/api/guardians/sendOtp",
  //   permit.context.builder,
  //   // permit.context.requiresToken,
  //   api.guardians.sendOtp
  // );
  app.post(
    '/api/guardians/inviteToJoin',
    permit.context.builder,
    // permit.context.requiresToken,
    api.guardians.inviteToJoin
  );
  app.post(
    '/api/guardians/askToJoin',
    permit.context.builder,
    // permit.context.requiresToken,
    api.guardians.askToJoin
  );
  app.put(
    '/api/guardians/activeOrDeactive',
    permit.context.requiresToken,
    api.guardians.activeOrDeactive
  );

  //program routes//
  app.post(
    '/api/programs/add',
    permit.context.requiresToken,
    api.programs.create
  );
  app.put(
    '/api/programs/update/:id',
    permit.context.requiresToken,
    api.programs.update
  );
  app.get(
    '/api/programs/getById/:id',
    permit.context.builder,
    api.programs.getById
  );
  app.get('/api/programs/list', permit.context.builder, api.programs.list);
  app.delete(
    '/api/programs/delete/:id',
    permit.context.requiresToken,
    api.programs.remove
  );
  app.put(
    '/api/programs/uploadTimeLinePics/:id',
    permit.context.requiresToken,
    upload.array('image', 5),
    api.programs.uploadTimelinePics
  );
  app.get(
    '/api/programs/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.programs.search
  );
  app.get(
    '/api/programs/byProvider',
    permit.context.builder,
    api.programs.programsByProvider
  );
  app.post(
    '/api/programs/addProgramAction',
    permit.context.requiresToken,
    api.programs.addProgramAction
  );
  app.get(
    '/api/programs/count',
    permit.context.requiresToken,
    api.programs.programCountByUserId
  );
  app.get(
    '/api/programs/getViewsCount',
    permit.context.requiresToken,
    api.programs.viewsByUserId
  );

  app.put(
    '/api/programs/activeOrDecactive',
    permit.context.requiresToken,
    api.programs.activeOrDecactive
  );
  app.get(
    '/api/programs/getGraphData',
    permit.context.builder,
    permit.context.requiresToken,
    api.programs.graphData
  );

  app.get(
    '/api/programs/byFilter',
    permit.context.builder,
    permit.context.builder,
    api.programs.filter
  );

  app.post(
    '/api/programs/import',
    permit.context.builder,
    // permit.context.requiresToken,
    upload.single('csv'),
    api.programs.importProgram
  );

  app.get(
    '/api/programs/getProgramsByDate',
    permit.context.builder,
    // validator.users.get,
    api.programs.getProgramsByDate
  );

  app.get(
    '/api/programs/publishedOrUnPublishedPrograms',
    permit.context.requiresToken,
    api.programs.publishedOrUnPublishedPrograms
  );

  app.get(
    '/api/programs/openPrograms',
    permit.context.builder,
    api.programs.openPrograms
  );

  app.put(
    '/api/programs/publish',
    permit.context.requiresToken,
    api.programs.publish
  );

  app.get(
    '/api/programs/listPublishOrUnpublish',
    permit.context.builder,
    api.programs.listPublishOrUnpublish
  );

  app.get(
    '/api/programs/searchByNameAndDate',
    permit.context.builder,
    api.programs.searchByNameAndDate
  );

  app.post(
    '/api/programs/uploadExcel',
    permit.context.builder,
    upload.single('csv'),
    api.programs.uploadExcel
  );

  app.get(
    '/api/programs/topRating',
    permit.context.builder,
    api.programs.topRating
  );
  app.get(
    '/api/programs/multiFilter',
    permit.context.builder,
    api.programs.multiFilter
  );
  app.get('/api/programs/nearBy', permit.context.builder, api.programs.nearBy);
  app.get(
    '/api/programs/subCategoryFilter',
    permit.context.builder,
    api.programs.subCategoryFilter
  );
  app.put(
    '/api/programs/duplicateCreate/:id',
    permit.context.requiresToken,
    api.programs.duplicateCreate
  );
  app.get(
    '/api/programs/childTagProgramCount',
    permit.context.builder,
    api.programs.childTagProgramCount
  );
  app.post(
    '/api/programs/expireProgram',
    permit.context.requiresToken,
    api.programs.expireProgram
  );
  app.get(
    '/api/programs/expiresInWeek',
    permit.context.requiresToken,
    api.programs.expiresInWeek
  );

  app.get(
    '/api/programs/searchByKeyValue',
    permit.context.builder,
    api.programs.searchByKeyValue
  );

  app.get(
    '/api/programs/expired',
    permit.context.builder,
    api.programs.expired
  );
  app.get(
    '/api/programs/montclairPrograms',
    permit.context.builder,
    api.programs.montclairPrograms
  );
  app.get(
    '/api/programs/histogram',
    permit.context.builder,
    api.programs.histogram
  );
  app.get(
    '/api/programs/groupPublishOrUnpublish',
    permit.context.builder,
    api.programs.groupPublishOrUnpublish
  );
  app.get(
    '/api/programs/byUser',
    permit.context.requiresToken,
    api.programs.programsByUser
  );
  app.put(
    '/api/programs/freeTrail',
    permit.context.requiresToken,
    api.programs.freeTrail
  );
  app.post(
    '/api/programs/bulkPublishOrUnpublish',
    permit.context.builder,
    api.programs.bulkPublishOrUnpublish
  );
  app.get(
    '/api/programs/expiredByProvider',
    permit.context.builder,
    api.programs.expiredByProvider
  );
  app.post(
    '/api/programs/bulkExpire',
    permit.context.builder,
    api.programs.bulkExpire
  );
  app.get(
    '/api/programs/searchWithProviderId',
    permit.context.builder,
    api.programs.searchWithProviderId
  );

  //=============favourites api=====================//
  app.post(
    '/api/favourites/add',
    permit.context.requiresToken,
    api.favourites.create
  );

  app.get(
    '/api/favourites/getByParentId',
    permit.context.builder,
    api.favourites.listByUserId
  );

  app.delete(
    '/api/favourites/delete/:id',
    permit.context.requiresToken,
    api.favourites.remove
  );

  app.get(
    '/api/favourites/savedProvidersUserId',
    permit.context.builder,
    api.favourites.savedProvidersUserId
  );

  app.delete(
    '/api/favourites/unsaveProvider/:id',
    permit.context.requiresToken,
    api.favourites.unsaveProvider
  );


  // uploads api//
  app.post(
    '/api/uploads/getPicUrl',
    permit.context.requiresToken,
    upload.single('image'),
    api.uploads.getPicUrl
  );

  // claims api//
  app.post(
    '/api/claims/request',
    permit.context.requiresToken,
    api.claims.request
  );

  app.get(
    '/api/claims/requestList',
    permit.context.requiresToken,
    api.claims.requestList
  );

  app.get(
    '/api/claims/requestListByProvider',
    permit.context.requiresToken,
    api.claims.requestListByProvider
  );

  app.put(
    '/api/claims/action/:id',
    permit.context.requiresToken,
    api.claims.action
  );

  // post api//
  app.post(
    '/api/posts/create',
    permit.context.requiresToken,
    validator.posts.create,
    api.posts.create
  );

  app.get('/api/posts/list', permit.context.requiresToken, api.posts.list);

  app.get(
    '/api/posts/byId/:id',
    permit.context.requiresToken,
    api.posts.getById
  );

  app.get(
    '/api/posts/byUser/:id',
    permit.context.requiresToken,
    api.posts.postsByUserId
  );
  app.get(
    '/api/posts/byTagId/:id',
    permit.context.requiresToken,
    api.posts.postsByTagId
  );

  app.put(
    '/api/posts/update/:id',
    permit.context.requiresToken,
    api.posts.update
  );

  app.put(
    '/api/posts/remove/:id',
    permit.context.requiresToken,
    api.posts.remove
  );

  app.put(
    '/api/posts/increaseView/:id',
    permit.context.requiresToken,
    api.posts.increaseView
  );

  app.get('/api/posts/search', permit.context.requiresToken, api.posts.search);

  app.get(
    '/api/posts/postsByRole',
    permit.context.requiresToken,
    api.posts.postsByRole
  );
  // commment api//
  app.post(
    '/api/comments/create',
    permit.context.requiresToken,
    validator.comments.create,
    api.comments.create
  );

  app.put(
    '/api/comments/update/:id',
    permit.context.requiresToken,
    api.comments.update
  );

  app.put(
    '/api/comments/remove/:id',
    permit.context.requiresToken,
    api.comments.remove
  );

  app.get(
    '/api/comments/getById/:id',
    permit.context.requiresToken,
    api.comments.getById
  );
  // likes api//
  app.post(
    '/api/likes/like',
    permit.context.requiresToken,
    validator.likes.create,
    api.likes.add
  );

  app.put('/api/likes/unLikes', permit.context.requiresToken, api.likes.remove);

  // =========ambassdor api's============
  app.post(
    '/api/ambassador/addOrRemove',
    permit.context.requiresToken,
    api.ambassador.addOrRemove
  );
  app.get(
    '/api/ambassador/getAmbassadors',
    permit.context.requiresToken,
    // permit.context.builder,
    api.ambassador.getAmbassadors
  );

  app.post(
    '/api/ambassador/addActivities',
    permit.context.requiresToken,
    api.ambassador.addActivities
  );

  app.get(
    '/api/ambassador/getActivities',
    permit.context.requiresToken,
    api.ambassador.getActivities
  );

  app.post(
    '/api/ambassador/addActivityPoint',
    permit.context.requiresToken,
    api.ambassador.addActivityPoint
  );

  app.delete(
    '/api/ambassador/deleteActivity/:id',
    permit.context.requiresToken,
    api.ambassador.deleteActivity
  );

  app.put(
    '/api/ambassador/updateActivity/:id',
    permit.context.builder,
    // validator.users.updateActivity,
    api.ambassador.updateActivity
  );
  // =========Alert api's============
  app.post('/api/alert/create', permit.context.requiresToken, api.alert.create);
  app.get(
    '/api/alert/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.alert.list
  );
  app.delete(
    '/api/alert/deleteAlert/:id',
    permit.context.requiresToken,
    api.alert.deleteAlert
  );

  app.put('/api/alert/update', permit.context.requiresToken, api.alert.update);
  app.get(
    '/api/alert/showAlert',
    // permit.context.requiresToken,
    permit.context.builder,
    api.alert.showAlert
  );
  app.put(
    '/api/alert/deactivateAlert',
    permit.context.requiresToken,
    api.alert.deactivateAlert
  );

  // ==============Badges api's==============
  app.post(
    '/api/badges/create',
    permit.context.requiresToken,
    api.badges.create
  );
  app.get('/api/badges/list', permit.context.builder, api.badges.list);
  app.delete(
    '/api/badges/deleteBadge/:id',
    permit.context.requiresToken,
    api.badges.deleteBadge
  );

  app.put(
    '/api/badges/update',
    permit.context.requiresToken,
    api.badges.update
  );

  // =========Feature api's============
  app.post(
    '/api/feature/create',
    permit.context.requiresToken,
    api.feature.create
  );
  app.get(
    '/api/feature/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.feature.list
  );
  app.delete(
    '/api/feature/deleteFeature/:id',
    permit.context.requiresToken,
    api.feature.deleteFeature
  );
  app.put(
    '/api/feature/update/:id',
    permit.context.requiresToken,
    api.feature.update
  );
  app.get(
    '/api/feature/getById/:id',
    permit.context.requiresToken,
    api.feature.getById
  );

  // =========Plans api's============
  app.post('/api/plans/create', permit.context.requiresToken, api.plans.create);
  app.get(
    '/api/plans/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.plans.list
  );
  app.get(
    '/api/plans/getById/:id',
    permit.context.requiresToken,
    api.plans.getById
  );
  app.put(
    '/api/plans/update/:id',
    permit.context.requiresToken,
    api.plans.update
  );
  app.delete(
    '/api/plans/remove/:id',
    permit.context.requiresToken,
    api.plans.remove
  );
  app.put(
    '/api/plans/updateStatus/:id',
    permit.context.requiresToken,
    api.plans.updateStatus
  );

  //============conversation api's===================
  app.get(
    '/api/conversations/getOldChat',
    permit.context.requiresToken,
    api.conversations.getOldChat
  );

  //============twilio api's===================
  app.post(
    '/api/twilio/sendOtpSMS',
    permit.context.requiresToken,
    api.twilio.sendOtpSMS
  );
  app.post(
    '/api/twilio/otpVerify',
    permit.context.builder,
    api.twilio.otpVerify
  );

  //==============notification api's====================
  app.delete(
    '/api/notification/deleteNotification',
    permit.context.requiresToken,
    api.notification.deleteNotification
  );
  app.put(
    '/api/notification/onOff',
    permit.context.requiresToken,
    api.notification.notificationOnOff
  );
  app.delete(
    '/api/notification/deleteAll',
    permit.context.requiresToken,
    api.notification.deleteAll
  );
  app.put(
    '/api/notification/isRead/:id',
    permit.context.builder,
    api.notification.isRead
  );

  //==============search History api's====================
  app.post(
    '/api/searchHistory/create',
    permit.context.builder,
    api.searchHistory.create
  );
  app.get(
    '/api/searchHistory/getsearcHistoryOfUser',
    permit.context.builder,
    api.searchHistory.getsearcHistoryOfUser
  );
  app.delete(
    '/api/searchHistory/deleteSearchById',
    permit.context.requiresToken,
    api.searchHistory.deleteSearchById
  );
  app.delete(
    '/api/searchHistory/allClear/:id',
    permit.context.requiresToken,
    api.searchHistory.allClear
  );

  //==========feedback=============
  app.post(
    '/api/feedback/create',
    permit.context.builder,
    // permit.context.requiresToken,
    api.feedback.create
  );
  app.get(
    '/api/feedback/list',
    // permit.context.requiresToken,
    permit.context.builder,
    api.feedback.list
  );
  app.delete(
    '/api/feedback/deleteFeedback/:id',
    permit.context.requiresToken,
    api.feedback.deleteFeedback
  );

  app.put(
    '/api/feedback/update',
    permit.context.requiresToken,
    api.feedback.update
  );

  //========reports================
  app.get(
    '/api/reports/search',
    permit.context.requiresToken,
    // validator.users.update,
    api.reports.search
  );

  //=========suggestion==============
  app.post(
    '/api/suggestion/create',
    permit.context.builder,
    // permit.context.requiresToken,
    api.suggestion.create
  );
  app.get(
    '/api/suggestion/bySubcategoryId/:id',
    permit.context.builder,
    api.suggestion.bySubcategoryId
  );

  //=========invitation===============
  app.post(
    '/api/invitation/askToJoin',
    permit.context.builder,
    // permit.context.requiresToken,
    api.invitation.askToJoin
  );
  app.get(
    '/api/invitation/list',
    permit.context.requiresToken,
    permit.rolecheck.betaProgram,
    api.invitation.list
  );
  app.post(
    '/api/invitation/inviteToJoin',
    permit.context.builder,
    // permit.context.requiresToken,
    api.invitation.inviteToJoin
  );
  app.post(
    '/api/invitation/approveAll',
    // permit.context.builder,
    permit.context.requiresToken,
    permit.rolecheck.betaProgram,
    api.invitation.approveAll
  );
  app.put(
    '/api/invitation/approveOrDecline',
    permit.context.requiresToken,
    permit.rolecheck.betaProgram,
    api.invitation.approveOrDecline
  );
  app.get(
    '/api/invitation/listByParentId/:id',
    // permit.context.requiresToken,
    permit.context.builder,
    api.invitation.listByParentId
  );

  //================justfeedback=================
  app.post(
    '/api/justfeedback/create',
    permit.context.builder,
    // permit.context.requiresToken,
    api.justfeedback.create
  );
  app.get(
    '/api/justfeedback/list',
    // permit.context.requiresToken,
    permit.context.builder,
    api.justfeedback.list
  );
  app.delete(
    '/api/justfeedback/deleteFeedback/:id',
    permit.context.builder,
    api.justfeedback.deleteFeedback
  );

  app.put(
    '/api/justfeedback/update',
    permit.context.builder,
    api.justfeedback.update
  );
  //================role======================
  app.post('/api/role/create', permit.context.requiresToken, api.role.create);
  app.get(
    '/api/role/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.role.list
  );
  app.put('/api/role/update', permit.context.requiresToken, api.role.update);

  //========market_mailchimp==================

  app.post(
    '/api/marketMailchimp/addSubscriber',
    permit.context.builder,
    api.market_mailchimp.addSubscribers
  );

  //========filterkeys========================

  app.post('/api/filterkeys/create', permit.context.requiresToken, api.filterkeys.create);
  app.get(
    '/api/filterkeys/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.filterkeys.list
  );
  app.put('/api/filterkeys/update/:id', permit.context.requiresToken, api.filterkeys.update);
  app.delete(
    '/api/filterkeys/deleteFilterkey/:id',
    permit.context.requiresToken,
    api.filterkeys.deleteFilterkey
  );
  app.get(
    '/api/filterkeys/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.filterkeys.search
  );
  app.put(
    '/api/filterkeys/activeOrDeactive',
    permit.context.requiresToken,
    api.filterkeys.activeOrDeactive
  );

  //====================freetextSearch=============
  app.get(
    '/api/freetextSearch/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.freetextSearch.search
  );
  app.get(
    '/api/freetextSearch/list',
    permit.context.builder,
    // permit.context.requiresToken,
    api.freetextSearch.list
  );
  app.get(
    '/api/freetextSearch/listByParentId/:id',
    // permit.context.requiresToken,
    permit.context.builder,
    api.freetextSearch.listByParentId
  );
  app.delete(
    '/api/freetextSearch/remove/:id',
    permit.context.requiresToken,
    api.freetextSearch.remove
  );

  //==============search topic======================
  app.post('/api/searchTopics/create', permit.context.requiresToken, api.searchTopics.create);
  app.get(
    '/api/searchTopics/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.searchTopics.list
  );
  app.put('/api/searchTopics/update/:id', permit.context.requiresToken, api.searchTopics.update);
  app.delete(
    '/api/searchTopics/remove/:id',
    permit.context.requiresToken,
    api.searchTopics.remove
  );
  app.get(
    '/api/searchTopics/search',
    permit.context.builder,
    // permit.context.requiresToken,
    api.searchTopics.search
  );
  app.put(
    '/api/searchTopics/activeOrDeactive',
    permit.context.requiresToken,
    api.searchTopics.activeOrDeactive
  );
  app.get(
    '/api/searchTopics/getByName/:name',
    permit.context.builder,
    // validator.users.update,
    api.searchTopics.getByName
  );
  //===============meta service==========================
  app.post('/api/metaservice/create', permit.context.requiresToken, api.metaservice.create);
  app.get(
    '/api/metaservice/list',
    permit.context.requiresToken,
    // permit.context.builder,
    api.metaservice.list
  );
  app.put('/api/metaservice/update/:id', permit.context.requiresToken, api.metaservice.update);
  app.delete(
    '/api/metaservice/remove/:id',
    permit.context.requiresToken,
    api.metaservice.remove
  );
  app.get(
    '/api/metaservice/getbyPagename/:name',
    permit.context.builder,
    // validator.users.update,
    api.metaservice.getbyPagename
  );
  log.end();
};

exports.configure = configure;