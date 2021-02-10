'use strict'
const baseUrl = require('config').get('image').baseUrl

exports.toModel = (entity) => {
    const mediaa = {
        image: entity.media.image ? baseUrl + entity.media.image : ""
    }
    const model = {
        msgFrom: entity.msgFrom,
        msgTo: entity.msgTo,
        msg: entity.msg,
        media: mediaa,
        date: entity.createdOn,
    }
    return model
}

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}