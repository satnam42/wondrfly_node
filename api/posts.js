"use strict";
const service = require("../services/posts");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:posts:create`);
    try {
        const post = await service.createPost(req.body, req.context);
        log.end();
        return response.data(res, post);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const list = async (req, res) => {
    const log = req.context.logger.start(`api:posts:list`);
    try {
        const posts = await service.getAllPosts(req.context);
        log.end();
        return response.data(res, posts);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const getById = async (req, res) => {
    const log = req.context.logger.start(`api:posts:list`);
    try {
        const post = await service.getPostById(req.params.id, req.context);
        log.end();
        return response.data(res, post);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const postsByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:posts:postsByUserId`);
    try {
        const posts = await service.getPostsByUserId(req.params.id, req.context);
        log.end();
        return response.data(res, posts);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const postsByTagId = async (req, res) => {
    const log = req.context.logger.start(`api:posts:postsByTagId`);
    try {
        const posts = await service.getPostsByTagId(req.params.id, req.context);
        log.end();
        return response.data(res, posts);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const update = async (req, res) => {
    const log = req.context.logger.start(`api:posts:update:${req.params.id}`);
    try {
        const post = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, post);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
const search = async (req, res) => {
    const log = req.context.logger.start(`api:posts:search`);
    try {
        const posts = await service.search(req.query, req.context);
        log.end();
        return response.data(res, posts);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.update = update;
exports.getById = getById;
exports.search = search;
exports.postsByTagId = postsByTagId
exports.postsByUserId = postsByUserId;
