'use strict'
var moment = require('moment')
const { data } = require('../exchange/response')
const search = async (query, context) => {
    const log = context.logger.start(`services:programs:search`)
    const dat = {
        $gte: moment(query.fromDate, 'MM-DD-YYYY').startOf('day').toDate(),
        $lt: moment(query.toDate, 'MM-DD-YYYY').endOf('day').toDate(),
    }
    let response = {
        data: [],
        labels: [],
    }

    let programs = await db.program.find({ createdOn: dat }).count()
    response.data.push(programs);
    response.labels.push('programs')
    let children = await db.child.find({ createdOn: dat }).count()
    response.data.push(children);
    response.labels.push('children')
    let providers = await db.user.find({ role: 'provider', createdOn: dat }).count()
    response.data.push(providers);
    response.labels.push('providers')
    let parents = await db.user.find({ role: 'parent', createdOn: dat }).count()
    response.data.push(parents);
    response.labels.push('parents')

    // console.log('response =>', response)
    log.end()
    return response
}
exports.search = search
