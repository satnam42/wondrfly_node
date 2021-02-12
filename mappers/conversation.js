'use strict'
const baseUrl = require('config').get('image').baseUrl

exports.toModel = (entity) => {
    const model = {
        msgFrom: entity.msgFrom,
        msgTo: entity.msgTo,
        msg: entity.msg,
        image: entity.image ? baseUrl + entity.image : "",
        date: entity.createdOn,
    }
    return model
}

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}