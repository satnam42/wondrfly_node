"use strict";

const { query } = require("express");

const build = async (model, context) => {
    const log = context.logger.start(`services:posts:build${model}`);
    const post = await new db.post({
        title: model.title,
        description: model.description,
        author: model.userId,
        postFor: model.postFor,
        tags: model.tagIds,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return post;
};
const set = (model, post, context) => {
    const log = context.logger.start("services:posts:set");
    if (model.title !== "string" && model.title !== undefined) {
        post.title = model.title;
    }
    if (model.description !== "string" && model.description !== undefined) {
        post.description = model.description;
    }
    if (model.postFor !== "string" && model.description !== undefined) {
        post.postFor = model.postFor;
    }
    if (model.tagIds.length) {
        post.tags = model.tagIds;
    }
    // if (model.comments.length) {
    //     post.comments = model.comments;
    // }
    post.updateOn = new Date()
    log.end();
    post.save();
    return post;
};
const createPost = async (model, context) => {
    const log = context.logger.start("services:posts:createPost");
    const post = build(model, context);
    log.end();
    return post;
};
const getAllPosts = async (query, context) => {
    const log = context.logger.start(`services:posts:getAlltags`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let posts
    if (context.user.role == 'provider' || context.user.role == 'parent') {
        posts = await db.post.find({ postFor: context.user.role }).populate('tags').populate('comments').populate('author').sort({ _id: -1 }).skip(skipCount).limit(pageSize);;

    } else {
        posts = await db.post.find({}).populate('tags').populate('comments').populate('author').sort({ _id: -1 }).skip(skipCount).limit(pageSize);;
    }
    // let likes = await db.like.find({ creator: context.user.id }).populate('post')
    // if (likes.length) {
    //     // add fav in post
    //     for (var p = 0; p < posts.length; p++) {
    //         for (var l = 0; l < likes.length; l++) {
    //             if (likes[l].post !== null && likes[l].post !== undefined) {
    //                 if (posts[p].id === likes[l].post.id) {
    //                     posts[p].like = true
    //                 }
    //             }

    //         }
    //     }
    // }
    log.end();
    return posts;
};
const getPostById = async (id, context) => {
    const log = context.logger.start(`services:posts:getPostById`);
    if (!id) {
        throw new Error("post id is requried found");
    }
    const post = await db.post.findById(id)
    log.end();
    return post;
};
const getPostsByUserId = async (id, context) => {
    const log = context.logger.start(`services:posts:getPostsByUserId`);
    if (!id) {
        throw new Error("user id is requried");
    }

    let posts = await db.post.find({ author: id }).populate('tags')
        .populate('comments').populate('author').sort({ _id: -1 });
    let likes = await db.like.find({ creator: id }).populate('post')
    if (likes.length) {
        // add fav in program
        for (var p = 0; p < posts.length; p++) {
            for (var l = 0; l < likes.length; l++) {
                if (likes[l].post !== null && likes[l].post !== undefined) {
                    if (posts[p].id === likes[l].post.id) {
                        posts[p].like = true
                    }
                }

            }
        }
    }
    log.end();
    return posts;
};
const getPostsByTagId = async (id, context) => {
    const log = context.logger.start(`services:posts:getPostsByTagId`);
    if (!id) {
        throw new Error("post id is requried");
    }

    let posts = await db.post.find({ tags: id }).populate('tags')
        .populate('comments').populate('author').sort({ _id: -1 });
    let likes = await db.like.find({ creator: context.user.id }).populate('post')
    if (likes.length) {
        // add fav in post
        for (var p = 0; p < posts.length; p++) {
            for (var l = 0; l < likes.length; l++) {
                if (likes[l].post !== null && likes[l].post !== undefined) {
                    if (posts[p].id === likes[l].post.id) {
                        posts[p].like = true
                    }
                }

            }
        }
    }
    log.end();
    return posts;
};
const update = async (id, model, context) => {
    const log = context.logger.start(`services:posts:update`);
    if (!id) {
        throw new Error("post id is requried found");
    }
    let postDetail = await db.post.findById(id);
    if (!postDetail) {
        throw new Error("post not found");
    }
    const post = await set(model, postDetail, context);
    log.end();
    return post
};
const search = async (query, context) => {
    const log = context.logger.start(`services:posts:search`);
    const posts = await db.post.find({ title: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).limit(5).sort({ _id: -1 });
    log.end();
    return posts;

};
const removePost = async (id, context) => {
    const log = context.logger.start(`services:posts:update`);
    if (!id) {
        throw new Error("post id is requried found");
    }
    let postDetail = await db.post.findById(id);
    if (!postDetail) {
        throw new Error("post not found");
    }
    postDetail = null
    await db.post.deleteOne({ _id: id })
    postDetail = await db.post.findById(id);
    if (postDetail) {
        throw new Error("something went wrong");
    }
    log.end();

    return 'post deleted succesfully'
};
const addView = async (id, context) => {
    const log = context.logger.start(`services:posts:addView`);
    if (!id) {
        throw new Error("post id is requried found");
    }
    const post = await db.post.findById(id)
    post.viewCount += 1
    await post.save()
    log.end();
    return 'view added successfully';
};
exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.update = update;
exports.getPostById = getPostById
exports.search = search
exports.getPostsByUserId = getPostsByUserId
exports.getPostsByTagId = getPostsByTagId
exports.removePost = removePost
exports.addView = addView