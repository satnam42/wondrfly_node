'use strict'
const fs = require('fs')
const csv = require('csvtojson')
const encrypt = require('../permit/crypto.js')
const generator = require('generate-password')
const auth = require('../permit/auth')
const imageUrl = require('config').get('image').url
const baseUrl = require('config').get('image').baseUrl
const ObjectId = require('mongodb').ObjectID
const moment = require('moment')
var xlsxtojson = require("xlsx-to-json");

function humanize(str) {
  var i, frags = str.split(' ');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
  }
  return frags.join('_');
}


const buildUser = async (model, context) => {
  const log = context.logger.start(`services:users:buildUser${model}`)
  let isVerified = false
  if (
    model.firstName != '' &&
    model.firstName != 'string' &&
    model.phoneNumber != '' &&
    model.phoneNumber != 'string' &&
    model.addressLine1 != '' &&
    model.addressLine1 != 'string' &&
    model.city != '' &&
    model.city != 'string' &&
    model.state != '' &&
    model.state != 'string' &&
    model.country != '' &&
    model.country != 'string'
  ) {
    isVerified = true
  }


  const user = await new db.user({
    firstName: model.firstName,
    userName: model.userName,
    type: model.type || '',
    email: model.email,
    phoneNumber: model.phoneNumber,
    secondaryPhonenumber: model.secondaryPhonenumber,
    password: model.password,
    role: 'provider',
    addressLine1: model.addressLine1,
    addressLine2: model.addressLine2,
    isUserVerified: isVerified,
    street: model.street,
    state: model.state,
    location: model.location,
    zipCode: model.zipCode,
    lng: model.lng,
    lat: model.lat,
    // source: model.source,
    city: model.city,
    country: model.country,
    note: model.note,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()
  log.end()
  return user
}

const build = async (model, context) => {
  const log = context.logger.start(`services:providers:build${model}`)
  let password = await encrypt.getHash('321@LetsPlay!@#$%', context)
  if (model.Email == '') {
    let sNo = model.Sno.toString()
    model.Email = sNo + 'letsplay.us'
  }

  const user = await new db.user({
    firstName: model.Name,
    phone: model.Phone,
    email: model.Email,
    addressLine1: model.Address,
    password: password,
    role: 'provider',
  }).save()

  if (user) {
    const provider = await new db.provider({
      user: user._id,
    }).save()
    log.end()
    return provider
  } else log.info(`user id Not Found for record no ${model.Sno}`)
}

const setProviderDetail = async (model, provider, context) => {
  const log = context.logger.start('services:providers:setBasicInfo')
  if (model.categoryIds !== undefined && !model.categoryIds.length) {
    provider.categoires = model.categoryIds
  }
  if (model.about !== 'string' && model.about !== undefined) {
    provider.about = model.about
  }
  if (model.firstName !== 'string' && model.firstName !== undefined) {
    provider.alias = humanize(model.firstName)
  }
  if (model.userName !== 'string' && model.userName !== undefined) {
    provider.userName = model.userName
  }
  if (model.bio !== 'string' && model.bio !== undefined) {
    provider.bio = model.bio
  }
  if (!model.links.length && model.links !== undefined) {
    provider.links = model.links
  }
  if (model.cycle !== 'string' && model.cycle !== undefined) {
    provider.cycle = model.cycle
  }
  if (model.description !== 'string' && model.description !== undefined) {
    provider.description = model.description
  }
  if (model.facebook !== 'string' && model.facebook !== undefined) {
    provider.facebook = model.facebook
  }
  if (model.hours !== 'string' && model.hours !== undefined) {
    provider.hours = model.hours
  }
  if (model.imageURL !== 'string' && model.imageURL !== undefined) {
    provider.imageURL = model.imageURL
  }
  if (
    model.merchantVerified !== 'string' &&
    model.merchantVerified !== undefined
  ) {
    provider.merchantVerified = model.merchantVerified
  }
  if (model.linkedin !== 'string' && model.linkedin !== undefined) {
    provider.linkedin = model.linkedin
  }
  if (model.listingURL !== 'string' && model.listingURL !== undefined) {
    provider.listingURL = model.listingURL
  }
  if (model.twitter !== 'string' && model.twitter !== undefined) {
    provider.twitter = model.twitter
  }
  if (model.website !== 'string' && model.website !== undefined) {
    provider.website = model.website
  }
  if (model.youtube !== 'string' && model.youtube !== undefined) {
    provider.youtube = model.youtube
  }
  if (model.awards !== 'string' && model.awards !== undefined) {
    provider.awards = model.awards
  }
  if (model.instagram !== 'string' && model.instagram !== undefined) {
    provider.instagram = model.instagram
  }
  if (model.logo !== 'string' && model.logo !== undefined) {
    provider.logo = model.logo
  }
  if (model.activeStatus !== 'string' && model.activeStatus !== undefined) {
    provider.activeStatus = model.activeStatus
  }
  if (model.healthAndSafety.length) {
    provider.healthAndSafety = model.healthAndSafety
  }
  if (model.categoryIds[0] !== 'string' && model.categoryIds[0] !== '') {
    provider.categories = model.categoryIds
  }
  if (model.subCategoryIds[0] !== 'string' && model.subCategoryIds[0] !== '') {
    provider.subCategoryIds = model.subCategoryIds
  }
  if (model.rating !== 'string' && model.rating !== '') {
    provider.rating = model.rating
  }
  if (model.source[0] !== 'string' && model.source[0] !== '') {
    provider.source = model.source
  }
  if (model.sourceUrl[0] !== 'string' && model.sourceUrl[0] !== '') {
    provider.sourceUrl = model.sourceUrl
  }
  if (model.cancellation_and_refund !== 'string' && model.cancellation_and_refund !== undefined) {
    provider.cancellation_and_refund = model.cancellation_and_refund
  }
  if (model.last_reviewed !== 'string' && model.last_reviewed !== undefined) {
    provider.last_reviewed = model.last_reviewed
  }
  if (model.cycle_time !== 'string' && model.cycle_time !== undefined) {
    provider.cycle_time = model.cycle_time
  }
  if (model.proof_reader_notes !== 'string' && model.proof_reader_notes !== undefined) {
    provider.proof_reader_notes = model.proof_reader_notes
  }


  provider.updateOn = new Date()
  provider.lastModifiedBy = context.user.id
  log.end()
  await provider.save()
  // const provider = await setproviderDetail(model, entity, context);

  return provider
}

const setBasicInfo = async (model, user, context) => {
  const log = context.logger.start('services:providers:set')
  if (
    model.firstName != '' &&
    model.firstName != 'string' &&
    model.phoneNumber != '' &&
    model.phoneNumber != 'string' &&
    model.addressLine1 != '' &&
    model.addressLine1 != 'string' &&
    model.city != '' &&
    model.city != 'string' &&
    model.state != '' &&
    model.state != 'string' &&
    model.country != '' &&
    model.country != 'string'
  ) {
    user.isUserVerified = true
  }
  if (model.firstName !== 'string' && model.firstName !== undefined) {
    user.firstName = model.firstName
  }
  if (model.lastName !== 'string' && model.lastName !== undefined) {
    user.lastName = model.lastName
  }
  if (model.userName !== 'string' && model.userName !== undefined) {
    user.userName = model.userName
  }
  if (model.email !== 'string' && model.email !== undefined) {
    user.email = model.email
  }
  if (model.sex !== 'string' && model.sex !== undefined) {
    user.sex = model.sex
  }
  if (model.phoneNumber !== 'string' && model.phoneNumber !== undefined) {
    user.phoneNumber = model.phoneNumber
  }
  if (
    model.secondaryPhonenumber !== 'string' &&
    model.secondaryPhonenumber !== undefined
  ) {
    user.secondaryPhonenumber = model.secondaryPhonenumber
  }
  if (model.addressLine1 !== 'string' && model.addressLine1 !== undefined) {
    user.addressLine1 = model.addressLine1
  }
  if (model.addressLine2 !== 'string' && model.addressLine2 !== undefined) {
    user.addressLine2 = model.addressLine2
  }
  if (model.city !== 'string' && model.city !== undefined) {
    user.city = model.city
  }
  if (model.country !== 'string' && model.country !== undefined) {
    user.country = model.country
  }
  if (model.state !== 'string' && model.state !== undefined) {
    user.state = model.state
  }
  if (model.street !== 'string' && model.street !== undefined) {
    user.street = model.street
  }
  // if (model.source !== 'string' && model.source !== undefined) {
  //   user.source = model.source
  // }
  if (model.note !== 'string' && model.note !== undefined) {
    user.note = model.note
  }
  if (model.zipCode !== 'string' && model.zipCode !== undefined) {
    user.zipCode = model.zipCode
  }
  if (model.location !== 'string' && model.location !== undefined) {
    user.location = model.location
  }
  if (model.lat !== 'string' && model.lat !== undefined) {
    user.lat = model.lat
  }
  if (model.lng !== 'string' && model.lng !== undefined) {
    user.lng = model.lng
  }
  if (model.location !== 'string' && model.location !== undefined) {
    user.location = model.location
  }
  if (model.isAmbassador !== 'string' && model.isAmbassador !== undefined) {
    user.isAmbassador = model.isAmbassador
  }
  if (model.stripeToken !== 'string' && model.stripeToken !== undefined) {
    user.stripeToken = model.stripeToken
  }
  if (model.stripeKey !== 'string' && model.stripeKey !== undefined) {
    user.stripeKey = model.stripeKey
  }
  if (
    model.securityQuestion !== 'string' &&
    model.securityQuestion !== undefined
  ) {
    user.securityQuestion = model.securityQuestion
  }
  if (model.answer !== 'string' && model.answer !== undefined) {
    user.answer = model.answer
  }
  if (model.interests.length > 1) {
    user.interests = model.interests
  }
  // user.lastModifiedBy = context.user.id

  user.updateOn = new Date()
  log.end()
  await user.save()
  // const provider = await setproviderDetail(model, entity, context);

  return user
}

const buildBanner = async (provider, files) => {
  let bannerImages = []
  let bannerUrl = ''

  await files.forEach((file) => {
    bannerUrl = imageUrl + file.filename
    bannerImages.push(bannerUrl)
  })

  return bannerImages
}

const importProvider = async (file, context) => {
  const log = context.logger.start('services:providers:setBasicInfo')
  if (file.fieldname != 'csv') {
    throw new Error('please provide csv file')
  }

  const rows = await csv().fromFile(file.path)
  if (rows.length < 1) {
    throw new Error('csv file is empty !please provide some data ')
  }

  // if (rows.length > 1000) {
  //     throw new Error("csv file have too data");
  // }
  let count = 0
  for (let row of rows) {
    if (row.Name !== '') {
      count++
      await build(row, context)
    }
  }
  // console.log(`total record inserted ${count}`)
  log.info(`${count} record inserted `)
  await fs.unlinkSync(file.path)
  return `total record inserted ${count}`
}

const getAllProvider = async (query, context) => {
  const log = context.logger.start(`services:providers:getAllProvider`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  const providers = await db.provider
    .find({})
    .sort({ date: -1 })
    .populate('categories')
    .skip(skipCount)
    .limit(pageSize)
  providers.count = await db.provider.find({}).count()
  log.end()
  return providers
}

const updateProvider = async (id, model, context) => {
  const log = context.logger.start(`services:providers:update`)
  let user = await db.user.findById(id)

  let provider = await db.provider.findOne({ user: user.id })
  if (!user) {
    throw new Error('provider Not Found')
  }
  // const isuserName = await db.user.findOne({ userName: { $eq: model.userName } })
  // if (isuserName) {
  //   throw new Error('userName already resgister')
  // }
  const userBasicInfo = await setBasicInfo(model, user, context)
  const providerDetail = await setProviderDetail(model, provider, context)
  log.end()
  return userBasicInfo
}


const uploadBannerPic = async (id, files, context) => {
  const log = context.logger.start(`services:provider:uploadBannerPic`)
  const provider = await db.provider.findOne({ user: { $eq: id } })
  if (files.length < 0) {
    throw new Error('image not found')
  }
  if (!provider) {
    throw new Error('provider not found')
  }

  let banners = await buildBanner(provider, files)
  provider.banners = banners
  await provider.save()
  log.end()
  return provider
}
const getProvideById = async (id, context) => {
  const log = context.logger.start(`services:providers:getAllProvider`)
  const provider = await db.provider
    .findOne({ user: id })
    .populate('user')
    .populate('categories')
    .populate('addedBy')
  if (provider.logo) {
    provider.logo = baseUrl + provider.logo
  }
  log.end()
  return provider
}

const getProvideByEmail = async (email, context) => {
  const log = context.logger.start(`services:providers:getProvideByEmail`)
  if (!email) {
    throw new Error('emial id is requried')
  }
  const user = await db.user.findOne({ email: { $eq: email } })
  if (!user) {
    throw new Error('provider not found')
  }
  log.end()
  return user
}
const search = async (name, context) => {
  const log = context.logger.start(`services:providers:search`)
  if (!name) {
    throw new Error('name is required')
  }
  let providers = await db.user
    .find({ firstName: { $regex: '.*' + name + '.*', $options: 'i' }, role: 'provider' })
    .limit(5)

  if (providers.length < 1) {
    throw new Error('provider not found')
  }

  let finalProviders = []
  providers.forEach((provider, index) => {
    if (
      provider.firstName != '' &&
      provider.firstName != 'string' &&
      provider.email != '' &&
      provider.email != 'string' &&
      provider.phoneNumber != '' &&
      provider.phoneNumber != 'string' &&
      provider.addressLine1 != '' &&
      provider.addressLine1 != 'string'
    ) {
      finalProviders.push(provider)
    } else {
      console.log('')
    }
  })
  let finalProvidersarry=[]
  for (let provider of providers) {
    let expired = await db.program.find({ user: ObjectId(provider._id), isExpired: true }).count()
    let active = await db.program.find({ user: ObjectId(provider._id), isExpired: false }).count()
    let all = await db.program.find({ user: ObjectId(provider._id)}).count()
    provider = provider.toJSON()
    provider.expiredPrograms = expired;
    provider.activePrograms = active;
    provider.allPrograms = all;

    // console.log('provider =>', provider);
    finalProvidersarry.push(provider);
  }
  providers=finalProvidersarry
  log.end()
  return providers
}

const addProvider = async (model, context) => {
  const log = context.logger.start('services:providers:addProvider')
  const isEmail = await db.user.findOne({ email: { $eq: model.email } })
  const isuserName = await db.user.findOne({ userName: { $eq: model.userName } })
  if (isEmail) {
    throw new Error('Email already resgister')
  }
  if (isuserName) {
    throw new Error('userName already resgister')
  }
  let genPassword = generator.generate({
    length: 10,
    numbers: true,
  })

  let word
  if (model.firstName) {
    word = humanize(model.firstName);
  }
  // model.password = await encrypt.getHash('321@LetsPlay!@#$%', context);
  model.password = await encrypt.getHash(genPassword, context)
  const user = await buildUser(model, context)
  if (user.role == 'provider') {
    console.log("user",context?.user)
    console.log("provider model",model)
    console.log("provider user",model)

    await new db.provider({
      user: user._id,
      alias: word ? word : '',
      categories: model.categoryIds,
      subCategoryIds: model.subCategoryIds,
      activeStatus: model.activeStatus,
      description: model.description,
      website: model.website,
      links: model.links,
      cycle: model.cycle,
      healthAndSafety: model.healthAndSafety,
      rating: model.rating,
      source: model.source,
      sourceUrl: model.sourceUrl,
      addedBy: context.user.id,
      cancellation_and_refund: model.cancellation_and_refund,
      last_reviewed: model.last_reviewed,
      cycle_time: model.cycle_time,
      proof_reader_notes: model.proof_reader_notes,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save()
  }
  log.end()
  return user
}

const getReport = async (query, context) => {
  const log = context.logger.start(`services:providers:getReport`)
  let data
  if (
    query.fromDate &&
    query.toDate &&
    query.fromDate !== '' &&
    query.toDate !== '' &&
    query.fromDate !== undefined &&
    query.toDate !== undefined
  ) {
    data = await db.user.aggregate([
      {
        $match: {
          createdOn: {
            $gte: new Date(query.fromDate),
            $lt: new Date(query.toDate),
          },
        },
      },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
    ])
  } else {
    data = await db.user.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
    ])
  }

  let response = {
    totalProvider: 0,
    labels: [],
    data: [],
  }
  if (data.length) {
    data.forEach((item) => {
      if (item._id == '' || item._id == null || item._id == undefined) {
        response.totalProvider += item.count
        response.labels.push('Other')
        response.data.push(item.count)
      } else if (item._id == 'Facebook') {
        response.totalProvider += item.count
        response.labels.push('Facebook')
        response.data.push(item.count)
      } else if (item._id == 'Library') {
        response.totalProvider += item.count
        response.labels.push('Library')
        response.data.push(item.count)
      } else if (item._id == 'Recreation') {
        response.totalProvider += item.count
        response.labels.push('Recreation')
        response.data.push(item.count)
      } else if (item._id == 'Instagram') {
        response.totalProvider += item.count
        response.labels.push('Instagram')
        response.data.push(item.count)
      } else if (item._id == 'Linkedin') {
        response.totalProvider += item.count
        response.labels.push('Linkedin')
        response.data.push(item.count)
      } else if (item._id == 'Indeed') {
        response.totalProvider += item.count
        response.labels.push('Indeed')
        response.data.push(item.count)
      } else if (item._id == 'Craiglist') {
        response.totalProvider += item.count
        response.labels.push('Craiglist')
        response.data.push(item.count)
      } else if (item._id == 'Combined') {
        response.totalProvider += item.count
        response.labels.push('Combined')
        response.data.push(item.count)
      } else if (item._id == 'Google') {
        response.totalProvider += item.count
        response.labels.push('Google')
        response.data.push(item.count)
      }
    })
  } else {
    throw new Error('No record found')
  }

  log.end()
  return response
}

const getProvidersByFilter = async (queryList, context) => {
  const log = context.logger.start(`services:providers:getProvidersByFilter`)
  let pageNo = Number(queryList.pageNo) || 1
  let pageSize = Number(queryList.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let query = {}

  if (
    queryList.city &&
    queryList.city !== undefined &&
    queryList.city !== null &&
    queryList.city !== ''
  ) {
    query['city'] = { $regex: '^' + queryList.city, $options: 'i' }
    queryList.city
  }
  if (
    queryList.state &&
    queryList.state !== undefined &&
    queryList.state !== null &&
    queryList.state !== ''
  ) {
    query['state'] = { $regex: '^' + queryList.state, $options: 'i' }
  }
  if (
    queryList.country &&
    queryList.country !== undefined &&
    queryList.country !== null &&
    queryList.country !== ''
  ) {
    query['country'] = { $regex: '^' + queryList.country, $options: 'i' }
  }
  if (
    queryList.source &&
    queryList.source !== undefined &&
    queryList.source !== null &&
    queryList.source !== ''
  ) {
    query['source'] = { $regex: '^' + queryList.source, $options: 'i' }
  }
  if (
    queryList.type &&
    queryList.type !== undefined &&
    queryList.type !== null &&
    queryList.type !== ''
  ) {
    query['type'] = { $regex: '^' + queryList.type, $options: 'i' }
  }
  if (
    queryList.sex &&
    queryList.sex !== undefined &&
    queryList.sex !== null &&
    queryList.sex !== ''
  ) {
    query['sex'] = { $regex: '^' + queryList.sex, $options: 'i' }
  }

  let user = await db.user.find(query).skip(skipCount).limit(pageSize)
  user.count = await db.user.find(query).count()

  log.end()
  return user
}

const getDupicate = async (model, context) => {
  const log = context.logger.start(`services:providers:getDupicate`)
  let query = {}
  if (model.email) {
    query.email = { $regex: '^' + model.email, $options: 'i' }
  }
  if (model.name) {
    query.firstName = { $regex: '^' + model.name, $options: 'i' }
  }
  if (model.phoneNumber) {
    query.phoneNumber = model.phoneNumber
  }
  if (Object.keys(query).length === 0 && obj.constructor === Object) {
    throw new Error(
      'From email, name, phone number one  param is required for find dulcate record'
    )
  }
  let provders = await db.user.find(query)
  log.end()
  return provders
}

const margeDupicate = async (model, context) => {
  const log = context.logger.start(`services:providers:margeDupicate`)
  if (!model.id) {
    throw new Error('Provider id is  Requried')
  }
  if (!model.duplicateProvidreId) {
    throw new Error('duplicate Provider id is  Requried')
  }

  if (model.duplicateProvidreId == model.id) {
    throw new Error('duplicate Provider id and  Provider id not be same')
  }

  await db.provider.deleteOne({ user: ObjectId(model.duplicateProvidreId) })
  await db.user.deleteOne({ _id: ObjectId(model.duplicateProvidreId) })

  let user = await db.user.findById(model.id)

  if (!user) {
    throw new Error('Provider not found')
  }

  let provider = await db.provider.findOne({ user: user.id })
  const userBasicInfo = await setBasicInfo(model, user, context)
  const providerDetail = await setProviderDetail(model, provider, context)

  log.end()
  return userBasicInfo
}

const getProvidersByDate = async (query, context) => {
  const { fromDate, toDate } = query

  const log = context.logger.start(`services:providers:getProvidersByDate`)
  const dat = {
    $gte: moment(fromDate, 'DD-MM-YYYY').startOf('day').toDate(),
    $lt: moment(toDate, 'DD-MM-YYYY').endOf('day').toDate(),
  }
  let providers = await db.provider.find({ createdOn: dat })
  log.end()
  return providers
}

const govtId = async (model, context) => {
  const { providerId, govtIdUrl, govtIdNote } = model
  const log = context.logger.start(`services:providers:govtId`)
  if (!providerId) {
    throw new Error('plan id is required')
  }
  let provider = await db.provider.findOne({ user: providerId })
  if (!provider) {
    throw new Error('plan not exist')
  }

  provider.govtIdUrl = govtIdUrl
  provider.govtIdNote = govtIdNote
  provider.updatedOn = new Date()
  await provider.save()
  log.end()
  return provider
}

const deletePhoneNumber = async (userId, context) => {
  const log = context.logger.start('services/providers/deletePhoneNumber')
  if (!userId) {
    throw new Error('userId is required')
  }
  let user = await db.user.findById(userId)
  if (!user) {
    throw new Error('user is not found')
  }
  user.phoneNumber = ''
  user.isPhoneVerified = false
  await user.save()

  let data = {
    message: 'Phone number is deleted',
  }
  log.end()
  return data
}

const isVerifiedOrNot = async (query, context) => {
  const log = context.logger.start(`services:providers:isVerifiedOrNot`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let providers
  if (query.type == 'verified') {
    providers = await db.user
      .find({ role: 'provider', isUserVerified: true })
      .sort({ date: -1 })
      .skip(skipCount)
      .limit(pageSize)
    providers.count = await db.user
      .find({ role: 'provider', isUserVerified: true })
      .count()
  }
  if (query.type == 'unverified') {
    providers = await db.user
      .find({ role: 'provider', isUserVerified: false })
      .sort({ date: -1 })
      .skip(skipCount)
      .limit(pageSize)
    providers.count = await db.user
      .find({ role: 'provider', isUserVerified: false })
      .count()
  }

  providers.forEach((user, index) => {
    let progress = 20
    if (
      user.phoneNumber !== 'string' &&
      user.phoneNumber !== undefined &&
      user.phoneNumber !== ''
    ) {
      progress += 10
    }
    if (
      user.avatarImages !== 'string' &&
      user.avatarImages !== undefined &&
      user.avatarImages !== ''
    ) {
      progress += 10
    }
    if (
      user.addressLine1 !== 'string' &&
      user.addressLine1 !== undefined &&
      user.addressLine1 !== ''
    ) {
      progress += 10
    }
    if (user.city !== 'string' && user.city !== undefined && user.city !== '') {
      progress += 10
    }
    if (
      user.state !== 'string' &&
      user.state !== undefined &&
      user.state !== ''
    ) {
      progress += 10
    }
    if (
      user.country !== 'string' &&
      user.country !== undefined &&
      user.country !== ''
    ) {
      progress += 10
    }
    let objUser = user
    providers.splice(index, 1)

    objUser.progress = progress
    providers.splice(index, 0, objUser)
  })

  log.end()
  return providers
}

const searchVerifiedOrUnverified = async (query, context) => {
  const log = context.logger.start(
    `services:providers:searchVerifiedOrUnverified`
  )

  if (!query.name) {
    throw new Error('name is required')
  }
  let providers
  if (query.type == 'verified') {
    providers = await db.user
      .find({
        firstName: { $regex: '.*' + query.name + '.*', $options: 'i' },
        isUserVerified: true,
        role: 'provider',
      })
      .limit(5)
  }
  if (query.type == 'unverified') {
    providers = await db.user
      .find({
        firstName: { $regex: '.*' + query.name + '.*', $options: 'i' },
        isUserVerified: false,
        role: 'provider',
      })
      .limit(5)
  }

  if (providers.length < 1) {
    throw new Error('provider not found')
  }

  providers.forEach((user, index) => {
    let progress = 20
    if (
      user.phoneNumber !== 'string' &&
      user.phoneNumber !== undefined &&
      user.phoneNumber !== ''
    ) {
      progress += 10
    }
    if (
      user.avatarImages !== 'string' &&
      user.avatarImages !== undefined &&
      user.avatarImages !== ''
    ) {
      progress += 10
    }
    if (
      user.addressLine1 !== 'string' &&
      user.addressLine1 !== undefined &&
      user.addressLine1 !== ''
    ) {
      progress += 10
    }
    if (user.city !== 'string' && user.city !== undefined && user.city !== '') {
      progress += 10
    }
    if (
      user.state !== 'string' &&
      user.state !== undefined &&
      user.state !== ''
    ) {
      progress += 10
    }
    if (
      user.country !== 'string' &&
      user.country !== undefined &&
      user.country !== ''
    ) {
      progress += 10
    }
    let objUser = user
    providers.splice(index, 1)
    objUser.progress = progress
    providers.splice(index, 0, objUser)
  })
  log.end()
  return providers
}

const getRatingByUser = async (id, context) => {
  const log = context.logger.start(`services:providers:getRatingByUser`)
  const provider = await db.provider.findOne({ user: id })
  const data = {}
  const { instagramFollowers, facebookRating, numberOfFacebook, googleRating, numberOfGoogle, yelpRating, numberOfYelp } = provider.rating;
  let totalRatingOnInstagram = instagramFollowers * 4
  let totalRatingOnGoogle = numberOfGoogle * googleRating
  let totalRatingOnYelp = numberOfYelp * yelpRating
  let totalRatingOnFacebook = numberOfFacebook * facebookRating

  let totalAll = totalRatingOnInstagram + totalRatingOnGoogle + totalRatingOnYelp + totalRatingOnFacebook;
  let totalNumberOf = instagramFollowers + numberOfGoogle + numberOfYelp + numberOfFacebook
  let finalRatingAverage = totalAll / totalNumberOf
  console.log('reviews', numberOfFacebook, numberOfGoogle, numberOfYelp);
  let totalReviews = numberOfFacebook + numberOfGoogle + numberOfYelp

  data.facebookRating = facebookRating
  data.numberOfFacebook = numberOfFacebook
  data.googleRating = googleRating
  data.numberOfGoogle = numberOfGoogle
  data.yelpRating = yelpRating
  data.numberOfYelp = numberOfYelp
  data.instagramFollowers = instagramFollowers
  data.finalAverageRating = finalRatingAverage.toFixed(1)
  data.totalReviews = totalReviews

  await db.user.findByIdAndUpdate(id, {
    $set: {
      averageFinalRating: finalRatingAverage.toFixed(1),
      totalReviews
    }
  })
  log.end()
  return data
}


///====================================================================================================================

const addExcelProvider = async (model, context, categoriesIds, subcategoriesIds, sourcs, sourcsUrl) => {
  const log = context.logger.start('services:providers:addProvider')
  let word
  if (model.firstName) {
    word = humanize(model.firstName);
  }
  const rating = {}
  rating.facebookRating = model.facebookRating
  rating.numberOfFacebook = model.numberOfFacebook
  rating.googleRating = model.googleRating
  rating.numberOfGoogle = model.numberOfGoogle
  rating.yelpRating = model.yelpRating
  rating.numberOfYelp = model.numberOfYelp
  rating.instagramFollowers = model.instagramFollowers
  // model.password = await encrypt.getHash('321@LetsPlay!@#$%', context);
  const user = await buildUser(model, context)
  if (user.role == 'provider') {
    await new db.provider({
      user: user._id,
      alias: word ? word : '',
      categories: categoriesIds,
      subCategoryIds: subcategoriesIds,
      activeStatus: model.activeStatus,
      description: model.description,
      website: model.website,
      links: model.links,
      cycle: model.cycle,
      healthAndSafety: model.healthAndSafety,
      source: sourcs,
      sourceUrl: sourcsUrl,
      rating: rating,
      addedBy: context.user.id,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save()
  }
  log.end()
  return user
}

// get categories and subcategories id's function ====
async function getIds(str, type) {
  let ids = []
  var str_array = str.split(',');
  if (type == 'category') {
    for (var i = 0; i < str_array.length; i++) {
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      let cate = await db.category.findOne({ name: { $eq: str_array[i] } })
      if (cate) {
        ids.push(cate._id)
      }
    }
    return ids;
  }
  if (type == 'subcategory') {
    for (var i = 0; i < str_array.length; i++) {
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      let cate = await db.tag.findOne({ name: { $eq: str_array[i] } })
      if (cate) {
        ids.push(cate._id)
      }
    }
    return ids;
  }

}

async function getSources(str) {
  let arr = []
  var str_array = str.split('and');
  for (var i = 0; i < str_array.length; i++) {
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    arr.push(str_array[i])
  }
  return arr

}

async function getSourcesUrl(str) {
  let arr = []
  var str_array = str.split(';');
  for (var i = 0; i < str_array.length; i++) {
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    arr.push(str_array[i])
  }
  return arr

}


const uploadExcel = async (file, context) => {
  const log = context.logger.start(`services:providers:uploadExcel`);
  if (!file) {
    throw new Error("file not found");
  }

  xlsxtojson({
    input: file.path,  // input xls
    output: "output.json", // output json 
    lowerCaseHeaders: true
  }, async function (err, records) {
    if (err) {
      console.log('error in xlsx ==>>>>', err);
    }
    if (records) {
      // console.log('===xls => records', records)
      let categries = []
      let subcategries = []
      let sourcs = []
      let sourcsUrl = []
      records.forEach(async function (record) {
        console.log('record', record.sourceUrl)
        categries = await getIds(record.categories, 'category');
        subcategries = await getIds(record.subCategoryIds, 'subcategory');
        sourcs = await getSources(record.source, 'source');
        sourcsUrl = await getSourcesUrl(record.sourceUrl, 'sourceUrl');

        const isEmail = await db.user.findOne({ email: { $eq: record.email } })
        if (!isEmail) {
          addExcelProvider(record, context, categries, subcategries, sourcs, sourcsUrl)
        }
      });
    }
  });
  await fs.unlinkSync(file.path)
  return "excel file uploaded successfully"
};

const montclairProviders = async (query, context) => {
  const log = context.logger.start(`services:providers:montclairProviders`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let finalProviders = []
  let providers = await db.user
    .find({ addressLine1: { $regex: '.*' + 'montclair' + '.*', $options: 'i' }, role: "provider" })
    .sort({ _id: -1 })
    .skip(skipCount)
    .limit(pageSize)
  for (let provider of providers) {
    let expired = await db.program.find({ user: ObjectId(provider._id), isExpired: true }).count()
    let active = await db.program.find({ user: ObjectId(provider._id), isExpired: false }).count()
    let all = await db.program.find({ user: ObjectId(provider._id)}).count()
    provider = provider.toJSON()
    provider.expiredPrograms = expired;
    provider.activePrograms = active;
    provider.allPrograms = all;
    // console.log('provider =>', provider);
    finalProviders.push(provider);
  }
  finalProviders.count = await db.user.find({ addressLine1: { $regex: '.*' + 'montclair' + '.*', $options: 'i' }, role: "provider" }).count()
  log.end()
  return finalProviders
}

const histogram = async (query, context) => {
  const log = context.logger.start(`services:programs:getProgramCount`)
  if (query.period == 'week') {
    let data = [];
    let Month = moment(new Date()).format('YYYY-MM-DD');
    let seven = moment(Month).subtract(7, 'days').format('YYYY-MM-DD')
    let six = moment(Month).subtract(14, 'days').format('YYYY-MM-DD')
    let fifth = moment(Month).subtract(21, 'days').format('YYYY-MM-DD')
    let fourth = moment(Month).subtract(28, 'days').format('YYYY-MM-DD')
    let third = moment(Month).subtract(35, 'days').format('YYYY-MM-DD')
    let second = moment(Month).subtract(42, 'days').format('YYYY-MM-DD')
    let first = moment(Month).subtract(49, 'days').format('YYYY-MM-DD')
    let compute
    let computeUpdated

    compute = await db.user.find({ createdOn: { $gte: first, $lt: second, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: first, $lt: second, }, role: "provider" }).count()

    data.push({ week: 1, count: compute, updatedCount: computeUpdated, start: first, end: second })
    compute = await db.user.find({ createdOn: { $gte: second, $lt: third, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: second, $lt: third, }, role: "provider" }).count()

    data.push({ week: 2, count: compute, updatedCount: computeUpdated, start: second, end: third })
    compute = await db.user.find({ createdOn: { $gte: third, $lt: fourth, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: third, $lt: fourth, }, role: "provider" }).count()

    data.push({ week: 3, count: compute, updatedCount: computeUpdated, start: third, end: fourth })
    compute = await db.user.find({ createdOn: { $gte: fourth, $lt: fifth, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: fourth, $lt: fifth, }, role: "provider" }).count()

    data.push({ week: 4, count: compute, updatedCount: computeUpdated, start: fourth, end: fifth })
    compute = await db.user.find({ createdOn: { $gte: fifth, $lt: six, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: fifth, $lt: six, }, role: "provider" }).count()

    data.push({ week: 5, count: compute, updatedCount: computeUpdated, start: fifth, end: six })
    compute = await db.user.find({ createdOn: { $gte: six, $lt: seven, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: six, $lt: seven, }, role: "provider" }).count()

    data.push({ week: 6, count: compute, updatedCount: computeUpdated, start: six, end: seven })
    compute = await db.user.find({ createdOn: { $gte: seven, $lt: Month, }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: seven, $lt: Month, }, role: "provider" }).count()

    data.push({ week: 7, count: compute, updatedCount: computeUpdated, start: seven, end: Month })
    log.end()
    return data
  }
  if (query.period == 'month') {
    let data = [];
    let seven = moment(new Date()).format('YYYY-MM-DD')
    let six = moment(new Date()).subtract(1, 'M').format('YYYY-MM-DD')
    let fifth = moment(new Date()).subtract(2, 'M').format('YYYY-MM-DD')
    let fourth = moment(new Date()).subtract(3, 'M').format('YYYY-MM-DD')
    let third = moment(new Date()).subtract(4, 'M').format('YYYY-MM-DD')
    let second = moment(new Date()).subtract(5, 'M').format('YYYY-MM-DD')
    let first = moment(new Date()).subtract(6, 'M').format('YYYY-MM-DD')
    let compute
    let computeUpdated

    compute = await db.user.find({ createdOn: { $gte: moment(first).startOf('month').format('YYYY-MM-DD'), $lt: moment(first).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(first).startOf('month').format('YYYY-MM-DD'), $lt: moment(first).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 1, count: compute, updatedCount: computeUpdated, period: moment(first).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(second).startOf('month').format('YYYY-MM-DD'), $lt: moment(second).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(second).startOf('month').format('YYYY-MM-DD'), $lt: moment(second).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 2, count: compute, updatedCount: computeUpdated, period: moment(second).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(third).startOf('month').format('YYYY-MM-DD'), $lt: moment(third).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(third).startOf('month').format('YYYY-MM-DD'), $lt: moment(third).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 3, count: compute, updatedCount: computeUpdated, period: moment(third).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(fourth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fourth).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(fourth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fourth).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 4, count: compute, updatedCount: computeUpdated, period: moment(fourth).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(fifth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fifth).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(fifth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fifth).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 5, count: compute, updatedCount: computeUpdated, period: moment(fifth).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(six).startOf('month').format('YYYY-MM-DD'), $lt: moment(six).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(six).startOf('month').format('YYYY-MM-DD'), $lt: moment(six).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 6, count: compute, updatedCount: computeUpdated, period: moment(six).startOf('month').format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(seven).startOf('month').format('YYYY-MM-DD'), $lt: moment(seven).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(seven).startOf('month').format('YYYY-MM-DD'), $lt: moment(seven).endOf('month').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ month: 7, count: compute, updatedCount: computeUpdated, period: moment(seven).startOf('month').format('YYYY-MM-DD') })
    log.end()
    return data
  }
  if (query.period == 'quarter') {
    let data = [];
    let eight = moment(new Date()).format('YYYY-MM-DD')
    let seven = moment(new Date()).subtract(3, 'M').format('YYYY-MM-DD')
    let six = moment(new Date()).subtract(6, 'M').format('YYYY-MM-DD')
    let fifth = moment(new Date()).subtract(9, 'M').format('YYYY-MM-DD')
    let fourth = moment(new Date()).subtract(12, 'M').format('YYYY-MM-DD')
    let third = moment(new Date()).subtract(15, 'M').format('YYYY-MM-DD')
    let second = moment(new Date()).subtract(18, 'M').format('YYYY-MM-DD')
    let first = moment(new Date()).subtract(21, 'M').format('YYYY-MM-DD')
    let compute
    let computeUpdated

    compute = await db.user.find({ createdOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 1, count: compute, updatedCount: computeUpdated, period: moment(first).format('YYYY-MM-DD'), end: moment(second).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 2, count: compute, updatedCount: computeUpdated, period: moment(second).format('YYYY-MM-DD'), end: moment(third).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(fourth).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(fourth).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 3, count: compute, updatedCount: computeUpdated, period: moment(third).format('YYYY-MM-DD'), end: moment(fourth).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(fourth).format('YYYY-MM-DD'), $lt: moment(fifth).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(fourth).format('YYYY-MM-DD'), $lt: moment(fifth).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 4, count: compute, updatedCount: computeUpdated, period: moment(fourth).format('YYYY-MM-DD'), end: moment(fifth).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(fifth).format('YYYY-MM-DD'), $lt: moment(six).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(fifth).format('YYYY-MM-DD'), $lt: moment(six).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 5, count: compute, updatedCount: computeUpdated, period: moment(fifth).format('YYYY-MM-DD'), end: moment(six).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(six).format('YYYY-MM-DD'), $lt: moment(seven).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(six).format('YYYY-MM-DD'), $lt: moment(seven).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 6, count: compute, updatedCount: computeUpdated, period: moment(six).format('YYYY-MM-DD'), end: moment(seven).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(seven).format('YYYY-MM-DD'), $lt: moment(eight).format('YYYY-MM-DD') }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(seven).format('YYYY-MM-DD'), $lt: moment(eight).format('YYYY-MM-DD') }, role: "provider" }).count()

    data.push({ Quarter: 7, count: compute, updatedCount: computeUpdated, period: moment(seven).format('YYYY-MM-DD'), end: moment(eight).format('YYYY-MM-DD') })
    log.end()
    return data

  }
  if (query.period == 'semiYear') {
    let data = [];
    let current = moment(new Date()).format('YYYY-MM-DD')
    let third = moment(new Date()).subtract(6, 'month').format('YYYY-MM-DD')
    let second = moment(new Date()).subtract(12, 'month').format('YYYY-MM-DD')
    let first = moment(new Date()).subtract(18, 'month').format('YYYY-MM-DD')
    let compute
    let computeUpdated

    compute = await db.user.find({ createdOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ semiYear: 1, count: compute, updatedCount: computeUpdated, period: moment(first).format('YYYY-MM-DD'), end: moment(second).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ semiYear: 2, count: compute, updatedCount: computeUpdated, period: moment(second).format('YYYY-MM-DD'), end: moment(third).format('YYYY-MM-DD') })
    compute = await db.user.find({ createdOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(current).format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(current).format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ semiYear: 3, count: compute, updatedCount: computeUpdated, period: moment(third).format('YYYY-MM-DD'), end: moment(current).format('YYYY-MM-DD') })
    log.end()
    return data
  }
  if (query.period == 'year') {
    let data = [];
    let current = moment(new Date()).format('YYYY-MM-DD')
    let previous = moment(new Date()).subtract(1, 'year').format('YYYY-MM-DD')
    let compute
    let computeUpdated

    compute = await db.user.find({ createdOn: { $gte: moment(previous).startOf('year').format('YYYY-MM-DD'), $lt: moment(previous).endOf('year').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(previous).startOf('year').format('YYYY-MM-DD'), $lt: moment(previous).endOf('year').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ year: 1, count: compute, updatedCount: computeUpdated, period: moment(previous).format('YYYY') })
    compute = await db.user.find({ createdOn: { $gte: moment(current).startOf('year').format('YYYY-MM-DD'), $lt: moment(current).endOf('year').format('YYYY-MM-DD'), }, role: "provider" }).count()
    computeUpdated = await db.user.find({ updatedOn: { $gte: moment(current).startOf('year').format('YYYY-MM-DD'), $lt: moment(current).endOf('year').format('YYYY-MM-DD'), }, role: "provider" }).count()

    data.push({ year: 2, count: compute, updatedCount: computeUpdated, period: moment(current).format('YYYY') })
    log.end()
    return data
  }
}

const saveProvider = async (model, context) => {
  const log = context.logger.start("services:providers:saveProvider");
  const Favourites = await db.saveProvider.find({ $and: [{ parent: model.parent }, { provider: model.provider }] })
  if (Favourites.length > 0) {
    return "favourite already exist";
  }
  const favourite = await new db.saveProvider({
    parent: model.parent,
    provider: model.provider,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  log.end();
  return favourite;
};

const freeTrail = async (query, context) => {
  const log = context.logger.start(`services:providers:freeTrail`)

  let user = await db.user.findById(query.userId)
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  user.isFreeTrial = query.isFreeTrial
  user.updatedOn = new Date()
  log.end()
  user.save()
  return user
}

const searchCreateModifiedDate = async (query, context) => {
  let date = new Date(query.date);
  const log = context.logger.start(`services:providers:searchCreateModifiedDate`)
  const providers = await db.user.find({
    createdOn: {
      $gte: date,
      $lte: moment(date).endOf('day')
    }
  })
  log.end()
  return providers
}

const getByUsername = async (username, context) => {
  const log = context.logger.start(`services:providers:getByUsername`)
  const provider = await db.user
    .findOne({ userName: username })
  log.end()
  return provider
}

const getAllProviderActivePrograms = async (query, context) => {
  const log = context.logger.start(`services:providers:getAllProviderActivePrograms`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let allTotal = []
  const providers = await db.user
    .find({ role: "provider" })
    .sort({ date: -1 })
    .skip(skipCount)
    .limit(pageSize)

  for (let provider of providers) {
    let progrmCount = await db.program.find({ user: provider._id, isExpired: false, isPublished: true }).count()
    let obj = {}
    obj.providerName = provider.firstName
    obj.programCount = progrmCount
    allTotal.push(obj)
  }
  allTotal.count = await db.provider.find({}).count()
  log.end()
  return allTotal
}
// getAllProviderActivePrograms

exports.importProvider = importProvider
exports.getAllProvider = getAllProvider
exports.updateProvider = updateProvider
exports.uploadBannerPic = uploadBannerPic
exports.getProvideById = getProvideById
exports.getProvideByEmail = getProvideByEmail
exports.search = search
exports.addProvider = addProvider
exports.getReport = getReport
exports.getProvidersByFilter = getProvidersByFilter
exports.getDupicate = getDupicate
exports.margeDupicate = margeDupicate
exports.getProvidersByDate = getProvidersByDate
exports.govtId = govtId
exports.deletePhoneNumber = deletePhoneNumber
exports.isVerifiedOrNot = isVerifiedOrNot
exports.searchVerifiedOrUnverified = searchVerifiedOrUnverified
exports.uploadExcel = uploadExcel
exports.getRatingByUser = getRatingByUser
exports.montclairProviders = montclairProviders;
exports.histogram = histogram;
exports.saveProvider = saveProvider;
exports.freeTrail = freeTrail;
exports.searchCreateModifiedDate = searchCreateModifiedDate;
exports.getByUsername = getByUsername;
exports.getAllProviderActivePrograms = getAllProviderActivePrograms;