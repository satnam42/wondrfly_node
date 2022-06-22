'use strict'
const ObjectId = require('mongodb').ObjectID
var moment = require('moment') // require for date formating
const csv = require('csvtojson')
const fs = require('fs')
const baseUrl = require('config').get('image').baseUrl
var xlsxtojson = require("xlsx-to-json");
const _ = require('lodash');


function humanize(str) {
  var i, frags = str.split(' ');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
  }
  return frags.join('_');
}





const buildImportProgram = async (model, context) => {
  const log = context.logger.start(
    `services:programs:buildImportProgram${model}`
  )
  let age = {
    from: 0,
    to: 0,
  }

  if (
    model.AgeRange !== '' &&
    model.AgeRange !== '-' &&
    model.AgeRange !== undefined &&
    model.AgeRange !== null
  ) {
    if (
      model.AgeRange.includes('above') ||
      model.AgeRange.includes('under') ||
      model.AgeRange.includes('all') ||
      model.AgeRange.includes('+')
    ) {
      if (model.AgeRange.includes('above')) {
        let ageRange = model.AgeRange.match(/\d+/g).map(Number)
        if (!ageRange) {
          age.from = 0
          age.to = 0
        } else {
          age.from = ageRange[0]
          age.to = 100
        }
      }

      if (model.AgeRange.includes('under')) {
        let ageRange = model.AgeRange.match(/\d+/g).map(Number)
        if (!ageRange) {
          age.from = 0
          age.to = 0
        } else {
          age.from = ageRange[0]
          age.to = 0
        }
      }
      if (model.AgeRange.includes('all')) {
        age.from = 0
        age.to = 100
      }
      if (model.AgeRange.includes('+')) {
        let ageRange = model.AgeRange.match(/\d+/g).map(Number)
        if (!ageRange) {
          age.from = 0
          age.to = 0
        } else {
          age.from = ageRange[0]
          age.to = 100
        }
      }
    } else {
      let isMonths = model.AgeRange.includes('months')
      if (isMonths) {
        age.from = 0
        age.to = 0
      } else {
        // set age range
        let ageRange = model.AgeRange.match(/\d+/g).map(Number)
        if (ageRange.length == 2) {
          age.from = ageRange[0]
          age.to = ageRange[1]
        }
      }
    }
  }

  let category
  let tag
  let categoryId
  let categories = []
  let tagByCategoryId
  let tags = []
  let date = {
    from: '',
    to: '',
  }
  let time = {
    from: '',
    to: '',
  }
  console.log('StartDateIsValid', moment(model.StartDate).isValid())
  if (
    model.StartDate !== '' &&
    model.StartDate !== '-' &&
    model.StartDate !== undefined &&
    model.StartDate !== null &&
    moment(model.StartDate).isValid()
  ) {
    date.from = moment(model.StartDate)
    log.info('date.from', date.from)
    console.log('date.from', date.from)
  } else {
    date.from = new Date()
  }

  console.log('EndDateIsValid', moment(model.StartDate).isValid())
  if (
    model.EndDate !== '' &&
    model.EndDate !== '-' &&
    model.EndDate !== undefined &&
    model.EndDate !== null &&
    moment(model.EndDate).isValid()
  ) {
    date.to = moment(model.EndDate)
    log.info('date.to', date.to)
    console.log('date.to', date.to)
  } else {
    time.to = new Date()
  }

  console.log(
    'timeFromIsValid',
    moment(model.StartDate + ' ' + model.StarTime).isValid()
  )

  if (
    model.StarTime !== '' &&
    model.StarTime !== '-' &&
    model.StarTime !== undefined &&
    model.StarTime !== null &&
    moment(model.StartDate + ' ' + model.StarTime).isValid()
  ) {
    time.from = moment(model.StartDate + ' ' + model.StarTime)
    log.info('time.from', time.from)
    console.log('time.from', time.from)
  } else {
    time.from = new Date()
  }

  console.log(
    'timeTOIsValid',
    moment(model.EndDate + ' ' + model.EndTime).isValid()
  )

  if (
    model.EndTime !== '' &&
    model.EndTime !== '-' &&
    model.EndTime !== undefined &&
    model.EndTime !== null &&
    moment(model.EndDate + ' ' + model.EndTime).isValid()
  ) {
    time.to = moment(model.EndDate + ' ' + model.EndTime)
    log.info('time.to', time.to)
    console.log('time.to', time.to)
  } else {
    time.to = new Date()
  }

  category = await db.category.findOne({ name: { $eq: model.Catogory } })

  if (!category) {
    category = await new db.category({
      name: model.Catogory ? model.Catogory : 'undefined',
      description: 'csv file data',
      createdOn: new Date(),
      updateOn: new Date(),
    }).save()
    categoryId = category.id
    await categories.push(categoryId)
  } else {
    categoryId = category.id
    console.log('category.id', category.id)
    await categories.push(categoryId)
    tagByCategoryId = await db.tag.findOne(
      { categoryIds: ObjectId(categoryId) },
      { name: model.SubCategory }
    )
  }

  if (!tagByCategoryId) {
    tag = await new db.tag({
      name: model.SubCategory ? model.SubCategory : 'undefined',
      description: 'csv file data',
      categoryIds: categories,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save()
    console.log('tagID', tag.id)
    tags.push(tag.id)
  } else {
    console.log('tagID', tagByCategoryId.id)
    tags.push(tagByCategoryId.id)
  }

  let user = await db.user.findOne({
    firstName: { $regex: '.*' + model.Reference + '.*', $options: 'i' },
  })

  if (!user) {
    user = await db.user.findOne({ firstName: model.Reference })
  }

  await new db.program({
    name: model.ProgramName,
    description: model.Description,
    price: model.Price,
    ageGroup: age,
    date: date,
    time: time,
    status: model.status || 'active',
    user: user.id,
    tags: tags,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()
  log.end()
  return
}

const build = async (model, context) => {
  const log = context.logger.start(`services:programs:build${model}`)
  let word
  if (model.name) {
    word = humanize(model.name);
  }
  let isPublished = false
  if (
    model.name != '' &&
    model.name != 'string' &&
    model.type != '' &&
    model.type != 'string' &&
    model.description != '' &&
    model.description != 'string' &&
    model.date.from != '' &&
    model.date.from != 'string' &&
    model.location != '' &&
    model.location != 'string' &&
    model.ageGroup.from != '' &&
    model.ageGroup.from != 'string'
  ) {
    isPublished = true
  }
  // totalPrograms
  // categoryId array
  let count = await db.program.find({ categoryId: model.categoryId }).count();
  await db.category.findByIdAndUpdate(model.categoryId, {
    $set: {
      totalPrograms: count += 1,
    }
  })
  const program = await new db.program({
    name: model.name,
    description: model.description,
    providerName: model.providerName,
    indoorOroutdoor: model.indoorOroutdoor,
    inpersonOrVirtual: model.inpersonOrVirtual,
    source: model.source,
    sourceUrl: model.sourceUrl,
    city: model.city,
    cycle: model.cycle,
    activeStatus: model.activeStatus,
    alias: word ? word : '',

    days: model.days,
    type: model.type,
    price: model.price,
    pricePeriod: model.pricePeriod,
    code: model.code,
    lat: model.lat,
    lng: model.lng,
    programCoverPic: model.programCoverPic,
    location: model.location,
    ageGroup: model.ageGroup,
    date: model.date,
    isDateNotMention: model.isDateNotMention,
    time: model.time,
    realTime: model.realTime,
    isTimeNotMention: model.isTimeNotMention,
    bookingCancelledIn: model.bookingCancelledIn,
    duration: model.duration,
    isFree: model.isFree,
    pricePerParticipant: model.pricePerParticipant,
    priceForSiblings: model.priceForSiblings,
    specialInstructions: model.specialInstructions,
    adultAssistanceIsRequried: model.adultAssistanceIsRequried,
    capacity: model.capacity,
    joiningLink: model.joiningLink,
    presenter: model.presenter,
    emails: model.emails,
    batches: model.batches,
    programImage: model.programImage,
    isPublished,
    status: model.status || 'active',
    user: model.userId || model.user,
    addresses: model.addresses,
    categoryId: model.categoryId,
    subCategoryIds: model.subCategoryIds,
    sessions: model.sessions,
    extractionDate: model.extractionDate,
    proofreaderObservation: model.proofreaderObservation,
    extractionComment: model.extractionComment,
    cyrilComment: model.cyrilComment,
    cyrilApproval: model.cyrilApproval,
    proofreaderRating: model.proofreaderRating,
    programRating: model.userRating,
    isproRated: model.isproRated,
    per_hour_rate: model.per_hour_rate,
    last_reviewed: model.last_reviewed,
    cycle_time: model.cycle_time,
    proof_reader_notes: model.proof_reader_notes,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()
  if (model.userId) {
    const notification = await new db.notification({
      title: 'creating program',
      description: 'Congratulations! your program is created successfully',
      user: model.userId,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save()
  }

  log.end()
  return program
}
const buildTimelineUrl = async (files) => {
  let bannerImages = []
  let bannerUrl = ''
  await files.forEach((file) => {
    bannerUrl = imageUrl + file.filename
    bannerImages.push(bannerUrl)
  })
  return bannerImages
}
const set = async (model, program, context) => {
  const log = context.logger.start('services:programs:set')
  let isPublished = false
  if (
    model.name != '' &&
    model.name != 'string' &&
    model.type != '' &&
    model.type != 'string' &&
    model.description != '' &&
    model.description != 'string' &&
    model.date.from != '' &&
    model.date.from != 'string' &&
    model.location != '' &&
    model.location != 'string' &&
    model.ageGroup.from != '' &&
    model.ageGroup.from != 'string'
  ) {
    isPublished = true
  }
  if (model.name !== 'string' && model.name !== undefined) {
    program.name = model.name
  }
  if (model.name !== 'string' && model.name !== undefined) {
    program.alias = humanize(model.name)
  }

  if (model.providerName !== 'string' && model.providerName !== undefined) {
    program.providerName = model.providerName
  }
  if (model.indoorOroutdoor !== 'string' && model.indoorOroutdoor !== undefined) {
    program.indoorOroutdoor = model.indoorOroutdoor
  }
  if (model.inpersonOrVirtual !== 'string' && model.inpersonOrVirtual !== undefined) {
    program.inpersonOrVirtual = model.inpersonOrVirtual
  }
  if (model.source !== 'string' && model.source !== undefined) {
    program.source = model.source
  }
  if (model.sourceUrl !== 'string' && model.sourceUrl !== undefined) {
    program.sourceUrl = model.sourceUrl
  }
  if (model.city !== 'string' && model.city !== undefined) {
    program.city = model.city
  }
  if (model.cycle !== 'string' && model.cycle !== undefined) {
    program.cycle = model.cycle
  }
  if (model.activeStatus !== 'string' && model.activeStatus !== undefined) {
    program.activeStatus = model.activeStatus
  }

  if (model.description !== 'string' && model.description !== undefined) {
    program.description = model.description
  }
  if (model.type !== 'string' && model.type !== undefined) {
    program.type = model.type
  }
  if (model.price !== 'string' && model.price !== undefined) {
    program.price = model.price
  }
  if (model.isDateNotMention !== 'string' && model.isDateNotMention !== undefined) {
    program.isDateNotMention = model.isDateNotMention
  }
  if (model.isTimeNotMention !== 'string' && model.isTimeNotMention !== undefined) {
    program.isTimeNotMention = model.isTimeNotMention
  }
  if (model.pricePeriod !== 'string' && model.pricePeriod !== undefined) {
    program.pricePeriod = model.pricePeriod
  }
  if (model.joiningLink !== 'string' && model.joiningLink !== undefined) {
    program.joiningLink = model.joiningLink
  }
  if (model.presenter !== 'string' && model.presenter !== undefined) {
    program.presenter = model.presenter
  }
  if (model.lat !== 'string' && model.lat !== undefined) {
    program.lat = model.lat
  }
  if (model.lng !== 'string' && model.lng !== undefined) {
    program.lng = model.lng
  }
  if (
    model.programCoverPic !== 'string' &&
    model.programCoverPic !== undefined
  ) {
    program.programCoverPic = model.programCoverPic
  }
  if (model.code !== 'string' && model.code !== undefined) {
    program.code = model.code
  }
  if (model.location !== 'string' && model.location !== undefined) {
    program.location = model.location
  }
  if (model.programImage !== 'string' && model.programImage !== undefined) {
    program.programImage = model.programImage
  }
  if (
    model.ageGroup.from !== 'string' &&
    model.ageGroup.to !== 'string' &&
    model.ageGroup.to !== undefined &&
    model.ageGroup.from !== undefined
  ) {
    program.ageGroup = model.ageGroup
  }
  if (
    model.date.from !== 'string' &&
    model.date.to !== 'string' &&
    model.date.from !== undefined &&
    model.date.to !== undefined
  ) {
    program.date = model.date
  }
  if (
    model.time.from !== 'string' &&
    model.time.to !== 'string' &&
    model.time.to !== undefined &&
    model.time.from !== undefined
  ) {
    program.time = model.time
  }
  if (
    model.bookingCancelledIn !== 'string' &&
    model.bookingCancelledIn !== undefined
  ) {
    program.bookingCancelledIn = model.bookingCancelledIn
  }
  if (model.duration !== 'string' && model.duration !== undefined) {
    program.duration = model.duration
  }
  if (model.isFree !== 'string' && model.isFree !== undefined) {
    program.isFree = model.isFree
  }
  if (
    model.pricePerParticipant !== 'string' &&
    model.pricePerParticipant !== undefined
  ) {
    program.pricePerParticipant = model.pricePerParticipant
  }
  if (
    model.priceForSiblings !== 'string' &&
    model.priceForSiblings !== undefined
  ) {
    program.priceForSiblings = model.priceForSiblings
  }
  if (
    model.specialInstructions !== 'string' &&
    model.specialInstructions !== undefined
  ) {
    program.specialInstructions = model.specialInstructions
  }
  if (
    model.adultAssistanceIsRequried !== 'string' &&
    model.adultAssistanceIsRequried !== undefined
  ) {
    program.adultAssistanceIsRequried = model.adultAssistanceIsRequried
  }
  if (model.capacity !== 'string' && model.capacity !== undefined) {
    program.capacity = model.capacity
  }
  // if (model.emails.length > 1) {
  //     program.emails = model.emails;
  // }

  program.isPublished = isPublished
  if (model.batches.length) {
    program.batches = model.batches
  }
  if (model.addresses.length) {
    program.addresses = model.addresses
  }
  if (model.categoryId[0] !== 'string' && model.categoryId[0] !== undefined) {
    program.categoryId = model.categoryId
  }
  if (model.subCategoryIds[0] !== 'string' && model.subCategoryIds[0] !== '') {
    program.subCategoryIds = model.subCategoryIds
  }
  if (model.extractionDate !== 'string' && model.extractionDate !== undefined) {
    program.extractionDate = model.extractionDate
  }
  if (model.proofreaderObservation !== 'string' && model.proofreaderObservation !== undefined) {
    program.proofreaderObservation = model.proofreaderObservation
  }
  if (model.extractionComment !== 'string' && model.extractionComment !== undefined) {
    program.extractionComment = model.extractionComment
  }
  if (model.cyrilComment !== 'string' && model.cyrilComment !== undefined) {
    program.cyrilComment = model.cyrilComment
  }
  if (model.cyrilApproval !== 'string' && model.cyrilApproval !== undefined) {
    program.cyrilApproval = model.cyrilApproval
  }
  if (model.proofreaderRating !== 'string' && model.proofreaderRating !== undefined) {
    program.proofreaderRating = model.proofreaderRating
  }

  if (model.sessions.length) {
    program.sessions = model.sessions
  }
  if (model.days) {
    program.days = model.days
  }
  if (model.per_hour_rate !== 'string' && model.per_hour_rate !== undefined) {
    program.per_hour_rate = model.per_hour_rate
  }
  if (model.last_reviewed !== 'string' && model.last_reviewed !== undefined) {
    program.last_reviewed = model.last_reviewed
  }
  if (model.cycle_time !== 'string' && model.cycle_time !== undefined) {
    program.cycle_time = model.cycle_time
  }
  if (model.proof_reader_notes !== 'string' && model.proof_reader_notes !== undefined) {
    program.proof_reader_notes = model.proof_reader_notes
  }
  program.isproRated = model.isproRated
  program.isExpired = model.isExpired
  program.lastModifiedBy = context.user.id
  program.updatedOn = new Date()
  log.end()
  await program.save()
  return program
}

const create = async (model, context) => {
  const log = context.logger.start('services:programs:create')

  let user = await db.user.findById(model.userId)

  if (user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  if (user.role !== 'admin') {
    if (
      !isObjKeyHasValue(user.phoneNumber) ||
      !isObjKeyHasValue(user.avatarImages) ||
      !isObjKeyHasValue(user.addressLine1)
    ) {
      throw new Error('your profile is incomplete you cannot add program!')
    }
  }
  model.userRating = user.averageFinalRating;
  const program = build(model, context)
  log.end()
  return program
}

const isObjKeyHasValue = async (value) => {
  if (value == '' || value == undefined || value == 'string') {
    return false
  }
  return true
}

const getAllprograms = async (query, context) => {
  const log = context.logger.start(`services:programs:getAllprograms`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs = await db.program
    .find()
    .sort({ _id: -1 })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
    .skip(skipCount)
    .limit(pageSize)
  programs.count = await db.program.find().count()
  let favourites
  if (context.user !== undefined) {
    favourites = await db.favourite
      .find({ user: context.user.id })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p].id === favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  log.end()
  return programs
}

const getById = async (id, context) => {
  const log = context.logger.start(`services:programs:getById`)
  if (!id) {
    throw new Error('id not found')
  }
  let program = await db.program
    .findById(id)
    .sort({ createdOn: -1 })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
  if (program) {
    let favourite = await db.favourite.findOne({ program: program.id })
    if (favourite) {
      program.isFav = true
    }
  }
  log.end()
  return program
}

const update = async (id, model, context) => {
  const log = context.logger.start(`services:programs:update`)
  if (!id) {
    throw new Error('id Not found')
  }
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  let programDetail = await db.program.findById(id)

  if (!programDetail) {
    throw new Error('program Not found')
  }

  const program = await set(model, programDetail, context)

  log.end()
  return program
}

const removeById = async (id, context) => {
  const log = context.logger.start(`services:programs:removeById`)
  if (!id) {
    throw new Error('programs id not found')
  }
  let isDeleted = await db.program.deleteOne({ _id: id })
  if (!isDeleted) {
    throw new Error('something went wrong')
  }
  log.end()
  return 'program deleted succesfully'
}

const uploadTimeLinePics = async (id, files, context) => {
  const log = context.logger.start(`services:programs:uploadTimeLinePics`)
  const program = await db.program.findOne({ _id: id })

  if (files.length < 0) {
    throw new Error('image not found')
  }

  if (!program) {
    throw new Error('program not found')
  }

  let pics = await buildTimelineUrl(files)
  program.timelinePics = pics
  await program.save()
  log.end()
  return program
}

const search = async (query, context) => {
  const log = context.logger.start(`services:programs:search`)
  const program = await db.program
    .find({ name: { $regex: '.*' + query.name + '.*', $options: 'i' } })
    .populate('tags')
    .populate('subCategoryIds')
    .limit(5)
  log.end()
  let finalProgram = []
  program.forEach((progrm, index) => {
    if (
      progrm.name != '' &&
      progrm.name != 'string' &&
      progrm.type != '' &&
      progrm.type != 'string' &&
      progrm.description != '' &&
      progrm.description != 'string' &&
      progrm.date.from != '' &&
      progrm.date.from != 'string' &&
      progrm.price != '' &&
      progrm.price != 'string' &&
      progrm.location != '' &&
      progrm.location != 'string' &&
      progrm.ageGroup.from != '' &&
      progrm.ageGroup.from != 'string'
    ) {
      finalProgram.push(progrm)
    } else {
      console.log('')
    }
  })
  log.end()
  return finalProgram
}
// name, type, description, date, price, location, ageGroup,
const getProgramsByProvider = async (query, context) => {
  const log = context.logger.start(`services:programs:getProgramsByProvider`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  if (!query.userId) {
    throw new Error('userId is  required')
  }
  let user = await db.user.findById(query.userId)
  if (!user) {
    throw new Error(
      'provider not found, So without provider programs not possible'
    )
  }
  // let programs = await db.program.find({ user: query.userId }).sort({ createdOn: -1 }).populate('tags').skip(skipCount).limit(pageSize);
  const programs = await db.program.aggregate([
    {
      $match: {
        user: ObjectId(query.userId),
        isPublished: true
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryId',
      },
    },
    {
      $lookup: {
        from: 'providers',
        localField: 'user',
        foreignField: 'user',
        as: 'provider',
      },
    },
    {
      $lookup: {
        from: "tags",
        let: { "subCategoryIds": "$subCategoryIds" },
        // pipeline: [
        //   { "$match": { "$expr": { "$in": ["$_id", "$$subCategoryIds"] } } }
        // ],
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$_id', { $ifNull: ['$$subCategoryIds', []] }] },
                ]
              }
            }
          }
        ],
        as: "subCategoryIds"
      }
    },
    { $limit: pageSize + skipCount },
    { $skip: skipCount },
  ])
  programs.count = await db.program.find({ user: query.userId }).count()
  log.end()
  let favourites
  if (user) {
    favourites = await db.favourite
      .find({ user: query.userId })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p]._id == favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  return programs
}
const addProgramAction = async (model, context) => {
  const log = context.logger.start('services:programs:increaseViewCount')
  let programActionCounter

  if (!model.programId) {
    throw new Error('program id is requried')
  }

  programActionCounter = await db.programActionCounter.findOne({
    $and: [{ user: context.user.id }, { program: model.programId }],
  })

  let count = 1

  if (model.action == 'view') {
    if ((programActionCounter != null) & (programActionCounter != undefined)) {
      programActionCounter.view = count += programActionCounter.view
      await programActionCounter.save()
    } else {
      programActionCounter = await new db.programActionCounter({
        view: count,
        program: model.programId,
        user: context.user.id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save()
    }
  } else if (model.action == 'click') {
    if (programActionCounter != null && programActionCounter != undefined) {
      programActionCounter.click = count += programActionCounter.click
      await programActionCounter.save()
    } else {
      programActionCounter = await new db.programActionCounter({
        click: count,
        program: model.programId,
        user: context.user.id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save()
    }
  } else if (model.action == 'favourite') {
    if (programActionCounter != null && programActionCounter != undefined) {
      programActionCounter.favourite = count += programActionCounter.favourite
      await programActionCounter.save()
    } else {
      click = await new db.programActionCounter({
        favourite: count,
        program: model.programId,
        user: context.user.id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save()
    }
  }
  log.end()
  return programActionCounter
}
const getViewCount = async (query, context) => {
  const log = context.logger.start(`services:programs:getViewCount`)
  if (!query.userId) {
    throw new Error('userId not found')
  }
  const viewCount = await db.programActionCounter.aggregate([
    {
      $lookup: {
        from: 'programs',
        localField: 'program',
        foreignField: '_id',
        as: 'program',
      },
    },
    {
      $match: {
        'program.user': ObjectId(query.userId),
      },
    },

    { $group: { _id: null, view: { $sum: '$view' } } },
  ])
  let data = {}
  if (viewCount.length) {
    data.count = viewCount[0].view
  } else {
    data.message = 'somethng went wrong'
  }

  log.end()
  return data
}
const getProgramCount = async (query, context) => {
  const log = context.logger.start(`services:programs:getProgramCount`)
  if (!query.userId) {
    throw new Error('userId is requried')
  }
  const count = await db.program
    .find({ $and: [{ user: query.userId }, { status: 'active' }] })
    .count()
  log.end()
  return count
}
const setActiveOrDecactive = async (query, context) => {
  const log = context.logger.start(`services:programs:getProgramCount`)
  if (!query.id) {
    throw new Error('program id is requried')
  }
  if (!query.status) {
    throw new Error('program status is requried')
  }
  let program = await db.program.findById(query.id)
  program.status = query.status
  await program.save()
  log.end()
  return program
}
const getGraphData = async (query, context) => {
  const log = context.logger.start(`services:programs:getGraphData`)
  if (!query.id) {
    throw new Error('userId is requried')
  }
  const data = await db.programActionCounter
    .aggregate([
      {
        $lookup: {
          from: 'programs',
          localField: 'program',
          foreignField: '_id',
          as: 'program',
        },
      },
      {
        $match: {
          'program.user': ObjectId(query.id),
        },
      },
      {
        $group: {
          _id: '$program.name',
          view: { $sum: '$view' },
          click: { $sum: '$click' },
          favourite: { $sum: '$favourite' },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ])
    .limit(5)

  let barChartRes = {
    barChartLabels: [],
    barChartData: [
      {
        label: 'Views',
        data: [],
      },
      {
        label: 'Clicks',
        data: [],
      },
      {
        label: 'Favourites',
        data: [],
      },
    ],
  }
  try {
    data.forEach((item) => {
      barChartRes.barChartLabels.push(item._id[0])
      barChartRes.barChartData.forEach((ChartData) => {
        if (ChartData.label == 'Views') {
          ChartData.data.push(item.view)
        } else if (ChartData.label == 'Clicks') {
          ChartData.data.push(item.click)
        } else if (ChartData.label == 'Favourites') {
          ChartData.data.push(item.favourite)
        }
      })
    })
  } catch (err) {
    throw new Error('barChartData mapping failed')
  }
  log.end()
  return barChartRes
}

// const getFilterProgram = async (model, context) => {
//   const log = context.logger.start(`services:programs:getFilterProgram`);
//   let pageNo = Number(model.pageNo) || 1;
//   let pageSize = Number(model.pageSize) || 10;
//   let skipCount = pageSize * (pageNo - 1);
//   let query = {}
//   if (model.ageFrom && model.ageTo) {
//     query["ageGroup.from"] = { $gte: Number(model.ageFrom) }
//     query["ageGroup.to"] = { $lte: Number(model.ageTo) }
//   }

//   if (model.fromDate !== undefined && model.toDate !== undefined && model.fromDate !== "" && model.toDate !== "" && model.fromDate !== null && model.toDate !== null) {
//     query["date.from"] = { $gte: model.fromDate }
//     query["date.to"] = { $lte: model.toDate }
//   }

//   if (model.toTime !== undefined && model.fromTime !== undefined && model.toTime !== "" && model.fromTime !== "" && model.toTime !== null && model.fromTime !== null) {
//     query["time.from"] = { $gte: new Date(model.fromTime).getTime() }
//     query["date.to"] = { $lte: new Date(model.toTime).getTime() }
//   }


//   let programs = await db.program.find(query).populate('tags').skip(skipCount).limit(pageSize);
//   programs.count = await db.program.find({ user: query.userId }).count();

//   log.end();
//   return programs;
// };

const getFilterProgram = async (query, context) => {
  const log = context.logger.start(`services:programs:getFilterProgram`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs
  let filterQueries = query;
  // programs = await db.program
  //   .find({ createdOn: dat, isPublished: true })
  //   .populate('tags')
  //   .populate('categoryId')
  //   .populate('subCategoryIds')
  //   .populate('user')
  //   .skip(skipCount)
  //   .limit(pageSize)


  if (query.fromDate && query.toDate) {
    const dat = {
      $gte: moment(query.fromDate, 'DD-MM-YYYY').startOf('day').toDate(),
      $lt: moment(query.toDate, 'DD-MM-YYYY').endOf('day').toDate(),
    }
    programs = await db.program
      .find({ createdOn: dat, isPublished: true })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.ageFrom && query.ageTo) {
    const age = {
      $gte: Number(query.ageFrom),
      $lte: Number(query.ageTo),
    }

    programs = await db.program
      .find({
        $or: [{ 'ageGroup.from': age, 'ageGroup.to': age, isPublished: true }],
      })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.fromTime && query.toTime) {
    // const tme = {
    //   $gte: moment(query.fromTime, 'DD-MM-YYYY').startOf('day').toDate(),
    //   $lt: moment(query.toTime, 'DD-MM-YYYY').endOf('day').toDate(),
    // }
    const tme = {
      $gte: query.fromTime,
      $lt: query.toTime,
    }

    programs = await db.program
      .find({ "realTime.from": tme })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.priceFrom && query.priceTo) {
    const byPrice = {
      $gte: query.priceFrom,
      $lte: query.priceTo,
    }
    programs = await db.program
      .find({ price: byPrice, isPublished: true })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.durationMin && query.durationMax) {
    const byduration = {
      $gte: query.durationMin,
      $lte: query.durationMax,
    }
    programs = await db.program
      .find({ duration: byduration, isPublished: true })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.categoryId) {
    programs = await db.program
      .find({ categoryId: query.categoryId, isPublished: true })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  if (query.type1 || query.type2) {
    programs = await db.program
      .find({ $or: [{ type: query.type1 }, { type: query.type2 }], isPublished: true })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
  }

  log.end()
  return programs
}

const importProgram = async (file, context) => {
  const log = context.logger.start('services:program:importProgram')
  if (file.fieldname != 'csv') {
    throw new Error('please provide csv file')
  }

  const rows = await csv().fromFile(file.path)
  if (rows.length < 1) {
    throw new Error('csv file is empty !please provide some data ')
  }

  let count = 0
  for (let row of rows) {
    if (
      row.ProgramName !== '' &&
      row.ProgramName !== null &&
      row.ProgramName !== undefined
    ) {
      count++
      await buildImportProgram(row, context)
    }
  }
  log.info(`${count} record inserted `)
  await fs.unlinkSync(file.path)
  return `total record inserted ${count}`
}

const getProgramsByDate = async (query, context) => {
  const { fromDate, toDate } = query
  const log = context.logger.start(`services:programs:getProgramsByDate`)
  const dat = {
    $gte: moment(fromDate, 'DD-MM-YYYY').startOf('day').toDate(),
    $lt: moment(toDate, 'DD-MM-YYYY').endOf('day').toDate(),
  }
  let programs = await db.program.find({ createdOn: dat }).populate('subCategoryIds')
  let count = await db.program.find({ createdOn: dat }).count()
  log.end()
  return programs
}

const publishedOrUnPublishedPrograms = async (query, context) => {
  const { userId, programType } = query
  const log = context.logger.start(
    `services:programs:publishedOrUnPublishedPrograms`
  )
  if (!userId) {
    throw new Error('user id is required')
  }
  let programs = await db.program.find({ user: userId }).populate('subCategoryIds')
  if (!programs) {
    throw new Error('programs not found')
  }
  let finalProgram = []
  if (programType == 'published') {
    programs.forEach((progrm, index) => {
      if (
        progrm.name != '' &&
        progrm.name != 'string' &&
        progrm.type != '' &&
        progrm.type != 'string' &&
        progrm.description != '' &&
        progrm.description != 'string' &&
        progrm.date.from != '' &&
        progrm.date.from != 'string' &&
        progrm.location != '' &&
        progrm.location != 'string' &&
        progrm.ageGroup.from != '' &&
        progrm.ageGroup.from != 'string'
      ) {
        finalProgram.push(progrm)
      } else {
        console.log('')
      }
    })
  }
  if (programType == 'unpublished') {
    programs.forEach((progrm, index) => {
      if (
        progrm.name == '' ||
        progrm.name == 'string' ||
        progrm.type == '' ||
        progrm.type == 'string' ||
        progrm.description == '' ||
        progrm.description == 'string' ||
        progrm.date.from == '' ||
        progrm.date.from == 'string' ||
        progrm.location == '' ||
        progrm.location == 'string' ||
        progrm.ageGroup.from == '' ||
        progrm.ageGroup.from == 'string'
      ) {
        finalProgram.push(progrm)
      } else {
        console.log('')
      }
    })
  }

  let count = await finalProgram.length
  let data = {
    count,
    finalProgram,
  }
  log.end()
  return data
}

const openPrograms = async (query, context) => {
  const log = context.logger.start(`services:programs:openPrograms`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs = await db.program
    .find({ isPublished: true })
    .sort({ createdOn: -1 })
    .populate('tags')
    .populate('subCategoryIds')
    .skip(skipCount)
    .limit(pageSize)
  let finalProgram = []
  let current = new Date()
  programs.forEach((progrm, index) => {
    if (moment(progrm.date.to).isSameOrAfter(current, 'day')) {
      finalProgram.push(progrm)
    }
  })
  log.end()
  finalProgram.count = finalProgram.length
  return finalProgram
}

const publish = async (query, context) => {
  const log = context.logger.start(`services:providers:publish`)

  let program = await db.program.findById(query.programId)
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  // if (
  //   program.name == '' ||
  //   program.name == 'string' ||
  //   program.type == '' ||
  //   program.type == 'string' ||
  //   program.description == '' ||
  //   program.description == 'string' ||
  //   program.date.from == '' ||
  //   program.date.from == 'string' ||
  //   program.location == '' ||
  //   program.location == 'string' ||
  //   program.ageGroup.from == '' ||
  //   program.ageGroup.from == 'string'
  // ) {
  //   throw new Error('you need to complete the program before publish it')
  // }
  program.isPublished = query.isPublished
  program.updatedOn = new Date()
  log.end()
  program.save()
  return program
}


const listPublishOrUnpublish = async (query, context) => {
  const log = context.logger.start(`services:providers:listPublishOrUnpublish`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs
  if (query.programType == 'published') {
    const programs = await db.program.aggregate([
      {
        $match: {
          isPublished: true,
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categoryId',
        },
      },
      {
        $lookup: {
          from: "tags",
          let: { "subCategoryIds": "$subCategoryIds" },
          // pipeline: [
          //   { "$match": { "$expr": { "$in": ["$_id", "$$subCategoryIds"] } } }
          // ],
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$_id', { $ifNull: ['$$subCategoryIds', []] }] },
                  ]
                }
              }
            }
          ],
          as: "subCategoryIds"
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'provider',
        },
      },
      { $sort: { programRating: 1 } },
      { $limit: pageSize + skipCount },
      { $skip: skipCount },
    ])
    programs.count = await db.program.find({ isPublished: true }).count()
    log.end()
    return programs.reverse()
  }
  if (query.programType == 'unpublished') {
    programs = await db.program
      .find({ isPublished: false })
      .sort({ createdOn: -1 })
      .populate('tags')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
    programs.count = await db.program.find({ isPublished: false }).count()
  }
  log.end()
  return programs
}
const groupPublishOrUnpublish = async (query, context) => {
  const log = context.logger.start(`services:providers:groupPublishOrUnpublish`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  if (query.programType == 'published') {
    const programs = await db.program.aggregate([
      {
        $match: {
          isPublished: true,
          isExpired: false
        },
      },
      {
        $group:
        {
          _id: "$user",
          total: { $sum: 1 },
          programs: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'programs.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'programs.categoryId',
          foreignField: '_id',
          as: 'categories',
        },
      },
      { $limit: pageSize + skipCount },
      { $skip: skipCount },
    ])

    programs.sort((a, b) => b.user[0].createdOn - a.user[0].createdOn)
    log.end()
    return programs
  }
  if (query.programType == 'unpublished') {
    programs = await db.program
      .find({ isPublished: false })
      .sort({ createdOn: -1 })
      .populate('tags')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
    programs.count = await db.program.find({ isPublished: false, isExpired: false }).count()
  }
  log.end()
  return programs
}

const searchByNameAndDate = async (query, context) => {
  const { programName, date } = query
  const log = context.logger.start(`services:programs:searchByNameAndDate`)

  // const d = {
  //   $gte: moment(date, 'DD-MM-YYYY').startOf('day').toDate(),
  //   $lt: moment(date, 'DD-MM-YYYY').endOf('day').toDate(),
  // }
  let programs1
  let tagPrograms = []
  let categoryPrograms = []
  if (programName) {
    programs1 = await db.program
      .find({
        name: { $regex: '.*' + programName + '.*', $options: 'i' },
        isPublished: true,
      }).populate('categoryId').populate('subCategoryIds').populate('user').limit(10)
    // console.log('programs1 =>>', programs1);
    let tag = await db.tag.find({ name: { $regex: '.*' + programName + '.*', $options: 'i' } }).limit(5)
    console.log('tag ---------', tag.length);
    if (tag.length >= 1) {
      tagPrograms = await db.program
        .find({ subCategoryIds: tag[0]._id, isPublished: true }).populate('categoryId').populate('subCategoryIds').populate('user').limit(10)
    }
    let category = await db.category.find({ name: { $regex: '.*' + programName + '.*', $options: 'i' } }).limit(5)
    if (category.length >= 1) {
      categoryPrograms = await db.program
        .find({ categoryId: category[0]._id, isPublished: true }).populate('categoryId').populate('subCategoryIds').populate('user').limit(10)
    }
  }

  let programs = programs1.concat(tagPrograms, categoryPrograms);
  programs = [...new Set([...programs1, ...tagPrograms, ...categoryPrograms])]
  // console.log('programs ==>>>', programs)

  let favourites
  if (context.user !== undefined) {
    favourites = await db.favourite
      .find({ user: context.user.id })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p].id === favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  log.end()
  return programs
}

// if (date) {
//   programs = await db.program.find({ createdOn: d, isPublished: true })
//     .populate('categoryId')
//     .populate('subCategoryIds')
//     .populate('user')
// }
// if (programName && date) {
//   programs = await db.program.find({
//     name: { $regex: '.*' + programName + '.*', $options: 'i' },
//     createdOn: d,
//     isPublished: true,
//   })
//     .populate('categoryId')
//     .populate('subCategoryIds')
//     .populate('user')
// }

const topRating = async (context) => {
  const log = context.logger.start(`services:programs:topRating`)
  // const users = await db.user.find({ averageFinalRating: { $gte: 4.0, $lte: 5.0 } });
  // let totalPrograms = []
  // for (let user of users) {
  //   console.log(user.id);
  //   const programs = await db.program.find({ user: user.id })
  //     .populate('tags')
  //     .populate('categoryId')
  //     .populate('subCategoryIds')
  //     .populate('user')
  //   totalPrograms.push(...programs)
  // }
  const programs = await db.program.find({ programRating: { $gte: 4.0, $lte: 5.0 } }).sort({ programRating: -1 })
    .populate('tags')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('user')
  log.end()
  return programs
}

const multiFilter = async (model, context) => {
  const log = context.logger.start(`services:programs:multiFilter`)
  let pageNo = Number(model.pageNo) || 1
  let pageSize = Number(model.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  // if (query.type1 || query.type2) {
  //   programs = await db.program
  //     .find({ $or: [{ type: query.type1 }, { type: query.type2 }], isPublished: true })
  // }
  let count = 0;
  let query = {}
  if (model.ageFrom && model.ageTo) {
    let ageArray = []

    // const agef = {
    //   $gte: Number(model.ageFrom),
    //   $lte: Number(model.ageTo),
    // }
    ageArray.push({ 'ageGroup.from': { '$gte': Number(model.ageFrom), '$lte': Number(model.ageTo) } })
    ageArray.push({ 'ageGroup.to': { '$gte': Number(model.ageFrom), '$lte': Number(model.ageTo) } })
    const ages = {
      $or: ageArray
    }

    query = ages
    // db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] })
    // query["ageGroup.from"] = agef
    // query["ageGroup.from"] = { $gte: Number(model.ageFrom) }
    // query["ageGroup.to"] = { $lte: Number(model.ageTo) }
  }

  if (model.fromDate !== undefined && model.toDate !== undefined && model.fromDate !== "" && model.toDate !== "" && model.fromDate !== null && model.toDate !== null) {
    // query["date.from"] = { $gte: model.fromDate }
    // query["date.to"] = { $lte: model.toDate }
    let start = new Date(model.fromDate)
    let end = new Date(model.toDate)
    let dateArray = []
    dateArray.push({ 'date.from': { '$gte': start, '$lte': end } })
    dateArray.push({ 'date.to': { '$gte': start, '$lte': end } })
    dateArray.push({ 'isDateNotMention': true })
    const dates = {
      $or: dateArray
    }
    query = dates
  }
  if (model.time !== undefined && model.time !== "" && model.time !== null) {
    //early-morning, morning, afternoon, late-afternoon, evening
    let timeArray = []
    var timeArr = model.time.split(',');
    for (const element of timeArr) {
      if (element == "early-morning") {
        timeArray.push({ 'realTime.from': { '$gte': 6, '$lt': 9 } })
      }
      if (element == "morning") {
        timeArray.push({ 'realTime.from': { '$gte': 9, '$lt': 12 } })
      }
      if (element == "afternoon") {
        timeArray.push({ 'realTime.from': { '$gte': 12, '$lt': 15 } })
      }
      if (element == "late-afternoon") {
        timeArray.push({ "realTime.from": { '$gte': 15, '$lt': 18, } })
      }
      if (element == "evening") {
        timeArray.push({ "realTime.from": { '$gte': 18, '$lt': 21, } })
      }

    }
    const times = {
      $or: timeArray
    }

    query = times
  }
  if (model.toTime !== undefined && model.fromTime !== undefined && model.toTime !== "" && model.fromTime !== "" && model.toTime !== null && model.fromTime !== null) {
    const tme = {
      $gte: model.fromTime,
      $lt: model.toTime,
    }

    query["realTime.from"] = tme
    // query["realTime.from"] = { $gte: model.fromTime }
    // query["realTime.from"] = { $lte: model.toTime }
  }
  if (model.priceFrom !== undefined && model.priceTo !== undefined && model.priceFrom !== "" && model.priceTo !== "" && model.priceFrom !== null && model.priceTo !== null) {
    const byPrice = {
      $gte: Number(model.priceFrom),
      $lte: Number(model.priceTo),
    }
    query["pricePerParticipant"] = byPrice
  }
  if (model.durationMin !== undefined && model.durationMax !== undefined && model.durationMin !== "" && model.durationMax !== "" && model.durationMin !== null && model.durationMax !== null) {
    const byduration = {
      $gte: model.durationMin,
      $lte: model.durationMax,
    }
    query["duration.hours"] = byduration
  }
  if (model.ratingFrom !== undefined && model.ratingTo !== undefined && model.ratingFrom !== "" && model.ratingTo !== "" && model.ratingFrom !== null && model.ratingTo !== null) {
    const byRating = {
      $gte: Number(model.ratingFrom),
      $lte: Number(model.ratingTo),
    }
    query["programRating"] = byRating
  }

  if (model.categoryId !== undefined && model.categoryId !== "" && model.categoryId !== null) {
    query["categoryId"] = ObjectId(model.categoryId);
  }
  if (model.type !== undefined && model.type !== "" && model.type !== null) {
    // query["type"] = model.type;
    const typeArray = []
    var typeArr = model.type.split(',');
    for (const element of typeArr) {
      typeArray.push(element)
    }
    // const types = { type: { $in: typeArray } }
    query["type"] = { $in: typeArray }
  }
  //Drops-in,Semesters,Camps,Other
  if (model.inpersonOrVirtual == 'inperson') {
    query["inpersonOrVirtual"] = 'Inperson'
  }
  if (model.inpersonOrVirtual == 'online') {
    query["inpersonOrVirtual"] = 'Virtual'
  }
  if (model.day !== undefined && model.day !== "" && model.day !== null) {
    console.log('day =>', model.day);
    const dayArray = []
    var nameArr = model.day.split(',');
    for (const element of nameArr) {
      if (element == "sunday") { dayArray.push({ "days.sunday": true }) }
      if (element == "monday") { dayArray.push({ "days.monday": true }) }
      if (element == "tuesday") { dayArray.push({ "days.tuesday": true }) }
      if (element == "wednesday") { dayArray.push({ "days.wednesday": true }) }
      if (element == "thursday") { dayArray.push({ "days.thursday": true }) }
      if (element == "friday") { dayArray.push({ "days.friday": true }) }
      if (element == "saturday") { dayArray.push({ "days.saturday": true }) }
    }
    // const ddays = {
    //   $or: dayArray
    // }
    // query = ddays
    query["$or"] = dayArray
  }
  if (model.tagsIds !== undefined && model.tagsIds !== "" && model.tagsIds !== null) {
    const tagsArray = []
    var tagArr = model.tagsIds.split(',');
    for (const element of tagArr) {
      tagsArray.push(ObjectId(element))
      count += await db.program.find({ subCategoryIds: ObjectId(element), isPublished: true, isExpired: false }).count()
    }
    // const tags = { subCategoryIds: { $in: tagsArray } }
    query["subCategoryIds"] = { $in: tagsArray }


  }
  if (model.lat !== undefined && model.lng !== undefined && model.lat !== "" && model.lng !== "" && model.lat !== null && model.lng !== null) {
    var lt = model.lat.substring(0, 3)
    var lg = model.lng.substring(0, 3)
    const nearbyArray = []
    nearbyArray.push({
      lat: {
        $regex: lt,
        $options: 'i'
      }
    })
    nearbyArray.push({
      lng: {
        $regex: lg,
        $options: 'i'
      }
    })
    const closeBy = {
      $and: nearbyArray
    }
    query = closeBy
  }

  // if (model.ageFrom || model.fromDate || model.toTime || model.priceFrom || model.durationMin || model.categoryId || model.type1 || model.type2) {
  //   query["isPublished"] = true
  // }
  query["isPublished"] = true
  query["isExpired"] = false
  const isEmpty = Object.keys(query).length === 0
  if (model.providerId) {
    query["user"] = ObjectId(model.providerId)
  }
  let programs
  if (!isEmpty) {
    // programs = await db.program.find(query)
    //   .sort({ programRating: -1 })
    //   .populate('tags')
    //   .populate('categoryId')
    //   .populate('subCategoryIds')
    //   .populate('user')
    //   .skip(skipCount)
    //   .limit(pageSize)
    //   .skip(skipCount).limit(pageSize);
    // if (query.subCategoryIds) {
    //   let programCount = await db.program.find(query).count();
    //   console.log('count', programCount)
    // }
    programs = await db.program.aggregate([
      {
        $match: query
      },
      {
        $group:
        {
          _id: "$user",
          programs: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'programs.user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'programs.categoryId',
          foreignField: '_id',
          as: 'categories',
        },
      },
      { $sort: { programRating: -1 } },
      { $limit: pageSize + skipCount },
      { $skip: skipCount },
    ])
    log.end()

  }

  programs.count = count

  // if (!isEmpty) {
  //   programs = await db.program.find(query)
  // }
  let favourites
  if (context.user !== undefined) {
    favourites = await db.favourite
      .find({ user: context.user.id })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p].id === favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  programs.programCount
  return programs
}

// programs list near by location
const nearBy = async (query, context) => {
  const log = context.logger.start(`services:programs:nearBy`)
  const { lat, lng } = query;
  var lt = lat.substring(0, 3)
  var lg = lng.substring(0, 3)

  const programs = await db.program.aggregate([
    {
      $match: {
        $and: [{
          lat: {
            $regex: lt,
            $options: 'i'
          }
        }, {
          lng: {
            $regex: lg,
            $options: 'i'
          }
        }
        ]
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryId',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'provider',
      },
    },
  ]).limit(10)
  log.end()
  return programs
}


const subCategoryFilter = async (model, context) => {
  const log = context.logger.start(`services:programs:subCategoryFilter`)
  let pageNo = Number(model.pageNo) || 1
  let pageSize = Number(model.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let filter = []
  if (model.subId1 !== undefined && model.subId1 !== "" && model.subId1 !== null) {
    filter.push(model.subId1);
  }
  if (model.subId2 !== undefined && model.subId2 !== "" && model.subId2 !== null) {
    filter.push(model.subId2);
  }
  if (model.subId3 !== undefined && model.subId3 !== "" && model.subId3 !== null) {
    filter.push(model.subId3);
  }
  if (model.subId4 !== undefined && model.subId4 !== "" && model.subId4 !== null) {
    filter.push(model.subId4);
  }
  if (model.subId5 !== undefined && model.subId5 !== "" && model.subId5 !== null) {
    filter.push(model.subId5);
  }
  const programs = await db.program.find({ subCategoryIds: { $in: filter }, })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
    .skip(skipCount)
  log.end();
  return programs
}
// const programs = await db.program.find({ subCategoryIds: { $in: filter }, }).skip(skipCount)
//==-----------------------------------------------------------
const addExcelPrograms = async (model, context, categoriesIds, subcategoriesIds, age, days, provider) => {
  // const addExcelPrograms = async (model, context, sourcs, sourcsUrl, age) => {
  const log = context.logger.start(`services:programs:build${model}`)
  let word
  if (model.name) {
    word = humanize(model.name);
  }
  let isPublished = false
  let fromT = model.startTime.replace(/:/g, '.');
  let tTime = model.endTime.replace(/:/g, '.');

  let realTime = {}
  realTime.from = Number(fromT.slice(0, -3))
  realTime.to = Number(tTime.slice(0, -3))

  let date = {}
  date.from = model.startDate;
  date.to = model.endDate;

  const program = await new db.program({
    name: model.name,
    description: model.description,
    providerName: model.providerName,
    indoorOroutdoor: model.indoorOroutdoor,
    inpersonOrVirtual: model.inpersonOrVirtual,
    source: model.source,
    sourceUrl: model.sourceUrl,
    city: model.city,
    cycle: model.cycle,
    activeStatus: model.activeStatus,
    alias: word ? word : '',

    type: model.type,
    price: model.price,
    priceUnit: model.priceUnit,
    pricePerParticipant: model.price,
    pricePeriod: model.pricePeriod,
    code: model.code,
    lat: model.lat,
    lng: model.lng,
    programCoverPic: model.programCoverPic,
    location: model.location,
    ageGroup: age,
    date: date,
    time: realTime,
    realTime: realTime,
    bookingCancelledIn: model.bookingCancelledIn,
    duration: model.duration,
    isFree: model.isFree,
    priceForSiblings: model.priceForSiblings,
    specialInstructions: model.specialInstructions,
    adultAssistanceIsRequried: model.adultAssistanceIsRequried,
    capacity: model.capacity,
    joiningLink: model.joiningLink,
    presenter: model.presenter,
    emails: model.email,
    batches: model.batches,
    programImage: model.programImage,
    isPublished,
    inpersonOrVirtual: model.inpersonOrVirtual,
    days: days,
    specialInstructions: model.specialInstructions,
    parentRequired: model.parentRequired,
    // dbStatus: model.dbStatus,
    sessionLength: model.sessionLength,

    status: 'active',
    user: provider,
    addresses: model.addresses,
    categoryId: categoriesIds,
    subCategoryIds: subcategoriesIds,
    // categoryId: model.categoryId,
    // subCategoryIds: model.subCategoryIds,
    source: model.source,
    sourceUrl: model.sourceUrl,
    sessions: model.sessions,
    extractionDate: model.extractionDate,
    proofreaderObservation: model.proofreaderObservation,
    extractionComment: model.extractionComment,
    cyrilComment: model.cyrilComment,
    cyrilApproval: model.cyrilApproval,
    proofreaderRating: model.proofreaderRating,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()
  log.end()
  return program
}


async function getDays(str) {
  let arr = {}
  var str_array = str.split(',');
  console.log('str_array', str_array)
  for (var i = 0; i < str_array.length; i++) {
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    if (str_array[i] == "monday") { arr.monday = true }
    if (str_array[i] == "tuesday") { arr.tuesday = true }
    if (str_array[i] == "wednesday") { arr.wednesday = true }
    if (str_array[i] == "thursday") { arr.thursday = true }
    if (str_array[i] == "friday") { arr.friday = true }
    if (str_array[i] == "saturday") { arr.saturday = true }
    if (str_array[i] == "sunday") { arr.sunday = true }
  }
  return arr
}
async function getIds(record) {
  let data = []
  let categoryArr = []
  if (record.subCategory1) {
    let tag = await db.tag.findOne({ name: { $eq: record.subCategory1 } })
    data.push(tag._id);
  }
  if (record.subCategory2) {
    let tag = await db.tag.findOne({ name: { $eq: record.subCategory2 } })
    data.push(tag._id);
  }
  if (record.subCategory3) {
    let tag = await db.tag.findOne({ name: { $eq: record.subCategory3 } })
    data.push(tag._id);
  }
  if (record.subCategory4) {
    let tag = await db.tag.findOne({ name: { $eq: record.subCategory4 } })
    data.push(tag._id);
  }
  if (record.subCategory5) {
    let tag = await db.tag.findOne({ name: { $eq: record.subCategory5 } })
    data.push(tag._id);
  }

  return data
}

async function categoryIds(record) {
  let data = []
  if (record.category1) {
    let category = await db.category.findOne({ name: { $eq: record.category1 } })
    data.push(category._id);
  }
  if (record.category2) {
    let category = await db.category.findOne({ name: { $eq: record.category2 } })
    data.push(category._id);
  }
  return data
}

async function getAge(str) {
  let ageGroup = {}
  var str_array = str.split('-');
  for (var i = 0; i < str_array.length; i++) {
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    ageGroup.from = str_array[0]
    ageGroup.to = str_array[1]
  }
  return ageGroup
}

const uploadExcel = async (file, context) => {
  const log = context.logger.start(`services:programs:uploadExcel`);
  if (!file) {
    throw new Error("file not found");
  }
  xlsxtojson({
    input: file.path,  // input xls
    output: "output.json", // output json 
    lowerCaseHeaders: true
  }, async function (err, result) {
    if (err) {
      console.log('error in xlsx ==>>>>', err);
    }
    if (result) {
      let categries = []
      let subcategries = []
      let sourcs = []
      let sourcsUrl = []
      let age = []
      let days = {};
      let count = 0;
      result.forEach(async function (record) {
        categries = await categoryIds(record);
        subcategries = await getIds(record);
        days = await getDays(record.days);
        // console.log('days', days);
        const provider = await db.user.findOne({ firstName: { $eq: record.providerName } });

        // sourcs = await getSources(record.source, 'source');
        // sourcsUrl = await getSourcesUrl(record.sourceUrl, 'sourceUrl');
        age = await getAge(record.ageGroup)
        addExcelPrograms(record, context, categries, subcategries, age, days, provider._id)
        // addExcelPrograms(record, context, sourcs, sourcsUrl, age)
      });
    }
  });
  log.end();
  await fs.unlinkSync(file.path)
  return "excel file uploaded successfully"
};

const duplicateCreate = async (id, context) => {
  const log = context.logger.start('services:programs:duplicateCreate')
  let progrm = await db.program.findById(id)

  if (!progrm) {
    throw new Error('original program is not found')
  }

  const program = build(progrm, context)
  log.end()
  return program
}

const childTagProgramCount = async (model, context) => {
  const log = context.logger.start(`services:programs:childTagProgramCount`);
  const age = {
    $gte: 0,
    $lte: Number(model.maxAge),
  }
  const count = await db.program.find({
    $and: [{ subCategoryIds: model.tagId }, { "ageGroup.to": age }],
  }).count()

  log.end()
  return count
}

const expireProgram = async (model, context) => {
  const log = context.logger.start(`services:programs:expireProgram`);
  const program = await db.program.findById(model.id);
  if (!program) {
    throw new Error('program does not exist');
  }
  program.isExpired = true;
  program.expireReason = model.reason;

  log.end()
  await program.save();
  return program
}

const expiresInWeek = async (query, context) => {
  const log = context.logger.start(`services:programs:expiresInWeek`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  const currentDate = new Date();
  let week = moment(currentDate).add(7, 'd')
  let programs = await db.program
    .find({ 'date.to': { '$gte': currentDate, '$lte': week._d } })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
    .skip(skipCount)
    .limit(pageSize)
  programs.count = await db.program.find().count()
  log.end()
  return programs
}

const searchByKeyValue = async (query, context) => {
  const log = context.logger.start(`services:programs:searchByKeyValue`)
  // keyType, keyValue
  let program
  if (query.keyType == "name") {
    program = await db.program
      .find({ name: { $regex: '.*' + query.keyValue + '.*', $options: 'i' } })
      .populate('user').populate('tags').populate('subCategoryIds').limit(5)
  }
  if (query.keyType == "type") {
    program = await db.program
      .find({ type: { $regex: '.*' + query.keyValue + '.*', $options: 'i' } })
      .populate('user').populate('tags').populate('subCategoryIds').limit(5)
  }
  if (query.keyType == "address") {
    program = await db.program
      .find({ addresses: { $regex: '.*' + query.keyValue + '.*', $options: 'i' } })
      .populate('user').populate('tags').populate('subCategoryIds').limit(5)
  }
  if (query.keyType == "location") {
    program = await db.program
      .find({ location: { $regex: '.*' + query.keyValue + '.*', $options: 'i' } })
      .populate('user').populate('tags').populate('subCategoryIds').limit(5)
  }

  log.end()
  return program
}

const getExpiredprograms = async (query, context) => {
  const log = context.logger.start(`services:programs:getExpiredprograms`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs = await db.program
    .find({ isExpired: true })
    .sort({ _id: -1 })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
    .skip(skipCount)
    .limit(pageSize)
  programs.count = await db.program.find().count()
  let favourites
  if (context.user !== undefined) {
    favourites = await db.favourite
      .find({ user: context.user.id })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p].id === favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  log.end()
  return programs
}

const montclairPrograms = async (query, context) => {
  const log = context.logger.start(`services:programs:montclairPrograms`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  let programs = await db.program
    .find({ location: { $regex: '.*' + 'montclair' + '.*', $options: 'i' } })
    .sort({ _id: -1 })
    .populate('tags')
    .populate('user')
    .populate('categoryId')
    .populate('subCategoryIds')
    .populate('lastModifiedBy')
    .skip(skipCount)
    .limit(pageSize)
  programs.count = await db.program.find({ location: { $regex: '.*' + 'montclair' + '.*', $options: 'i' } }).count()
  log.end()
  return programs
}
// var startMonth = moment(Month).startOf('month').format('YYYY-MM-DD');
// var endMonth = moment(Month).endOf('month').format('YYYY-MM-DD');
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
    compute = await db.program.find({ createdOn: { $gte: first, $lt: second, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: first, $lt: second, } }).count()
    data.push({ week: 1, count: compute, updatedCount: computeUpdated, start: first, end: second })
    compute = await db.program.find({ createdOn: { $gte: second, $lt: third, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: second, $lt: third, } }).count()
    data.push({ week: 2, count: compute, updatedCount: computeUpdated, start: second, end: third })
    compute = await db.program.find({ createdOn: { $gte: third, $lt: fourth, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: third, $lt: fourth, } }).count()
    data.push({ week: 3, count: compute, updatedCount: computeUpdated, start: third, end: fourth })
    compute = await db.program.find({ createdOn: { $gte: fourth, $lt: fifth, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: fourth, $lt: fifth, } }).count()
    data.push({ week: 4, count: compute, updatedCount: computeUpdated, start: fourth, end: fifth })
    compute = await db.program.find({ createdOn: { $gte: fifth, $lt: six, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: fifth, $lt: six, } }).count()
    data.push({ week: 5, count: compute, updatedCount: computeUpdated, start: fifth, end: six })
    compute = await db.program.find({ createdOn: { $gte: six, $lt: seven, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: six, $lt: seven, } }).count()
    data.push({ week: 6, count: compute, updatedCount: computeUpdated, start: six, end: seven })
    compute = await db.program.find({ createdOn: { $gte: seven, $lt: Month, } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: seven, $lt: Month, } }).count()
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
    compute = await db.program.find({ createdOn: { $gte: moment(first).startOf('month').format('YYYY-MM-DD'), $lt: moment(first).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(first).startOf('month').format('YYYY-MM-DD'), $lt: moment(first).endOf('month').format('YYYY-MM-DD'), } }).count()
    data.push({ month: 1, count: compute, updatedCount: computeUpdated, period: moment(first).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(second).startOf('month').format('YYYY-MM-DD'), $lt: moment(second).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(second).startOf('month').format('YYYY-MM-DD'), $lt: moment(second).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 2, count: compute, updatedCount: computeUpdated, period: moment(second).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(third).startOf('month').format('YYYY-MM-DD'), $lt: moment(third).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(third).startOf('month').format('YYYY-MM-DD'), $lt: moment(third).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 3, count: compute, updatedCount: computeUpdated, period: moment(third).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(fourth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fourth).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(fourth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fourth).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 4, count: compute, updatedCount: computeUpdated, period: moment(fourth).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(fifth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fifth).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(fifth).startOf('month').format('YYYY-MM-DD'), $lt: moment(fifth).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 5, count: compute, updatedCount: computeUpdated, period: moment(fifth).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(six).startOf('month').format('YYYY-MM-DD'), $lt: moment(six).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(six).startOf('month').format('YYYY-MM-DD'), $lt: moment(six).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 6, count: compute, updatedCount: computeUpdated, period: moment(six).startOf('month').format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(seven).startOf('month').format('YYYY-MM-DD'), $lt: moment(seven).endOf('month').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(seven).startOf('month').format('YYYY-MM-DD'), $lt: moment(seven).endOf('month').format('YYYY-MM-DD'), } }).count()

    data.push({ month: 7, count: compute, period: moment(seven).startOf('month').format('YYYY-MM-DD') })
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
    compute = await db.program.find({ createdOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 1, count: compute, updatedCount: computeUpdated, period: moment(first).format('YYYY-MM-DD'), end: moment(second).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 2, count: compute, updatedCount: computeUpdated, period: moment(second).format('YYYY-MM-DD'), end: moment(third).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(fourth).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(fourth).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 3, count: compute, updatedCount: computeUpdated, period: moment(third).format('YYYY-MM-DD'), end: moment(fourth).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(fourth).format('YYYY-MM-DD'), $lt: moment(fifth).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(fourth).format('YYYY-MM-DD'), $lt: moment(fifth).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 4, count: compute, updatedCount: computeUpdated, period: moment(fourth).format('YYYY-MM-DD'), end: moment(fifth).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(fifth).format('YYYY-MM-DD'), $lt: moment(six).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(fifth).format('YYYY-MM-DD'), $lt: moment(six).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 5, count: compute, updatedCount: computeUpdated, period: moment(fifth).format('YYYY-MM-DD'), end: moment(six).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(six).format('YYYY-MM-DD'), $lt: moment(seven).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(six).format('YYYY-MM-DD'), $lt: moment(seven).format('YYYY-MM-DD'), } }).count()

    data.push({ Quarter: 6, count: compute, updatedCount: computeUpdated, period: moment(six).format('YYYY-MM-DD'), end: moment(seven).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(seven).format('YYYY-MM-DD'), $lt: moment(eight).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(seven).format('YYYY-MM-DD'), $lt: moment(eight).format('YYYY-MM-DD'), } }).count()

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
    compute = await db.program.find({ createdOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(first).format('YYYY-MM-DD'), $lt: moment(second).format('YYYY-MM-DD'), } }).count()

    data.push({ semiYear: 1, count: compute, updatedCount: computeUpdated, period: moment(first).format('YYYY-MM-DD'), end: moment(second).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(second).format('YYYY-MM-DD'), $lt: moment(third).format('YYYY-MM-DD'), } }).count()

    data.push({ semiYear: 2, count: compute, updatedCount: computeUpdated, period: moment(second).format('YYYY-MM-DD'), end: moment(third).format('YYYY-MM-DD') })
    compute = await db.program.find({ createdOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(current).format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(third).format('YYYY-MM-DD'), $lt: moment(current).format('YYYY-MM-DD'), } }).count()

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

    compute = await db.program.find({ createdOn: { $gte: moment(previous).startOf('year').format('YYYY-MM-DD'), $lt: moment(previous).endOf('year').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(previous).startOf('year').format('YYYY-MM-DD'), $lt: moment(previous).endOf('year').format('YYYY-MM-DD'), } }).count()

    data.push({ year: 1, count: compute, updatedCount: computeUpdated, period: moment(previous).format('YYYY') })
    compute = await db.program.find({ createdOn: { $gte: moment(current).startOf('year').format('YYYY-MM-DD'), $lt: moment(current).endOf('year').format('YYYY-MM-DD'), } }).count()
    computeUpdated = await db.program.find({ updatedOn: { $gte: moment(current).startOf('year').format('YYYY-MM-DD'), $lt: moment(current).endOf('year').format('YYYY-MM-DD'), } }).count()

    data.push({ year: 2, count: compute, updatedCount: computeUpdated, period: moment(current).format('YYYY') })
    log.end()
    return data
  }
  if (query.fromDate && query.toDate) {
    let data = await db.program.find({ createdOn: { $gte: query.fromDate, $lt: query.toDate, } })
      .populate('tags')
      .populate('user')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('lastModifiedBy')
    log.end()
    return data
  }
}

// get categories and subcategories id's function ====
// async function getIds(str, type) {
//   let ids = []
//   var str_array = str.split(',');
//   if (type == 'category') {
//     console.log(' ========categories')
//     for (var i = 0; i < str_array.length; i++) {
//       str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//       let cate = await db.category.findOne({ name: { $eq: str_array[i] } })
//       if (cate) {
//         ids.push(cate._id)
//       }
//     }
//     return ids;
//   }
//   if (type == 'subcategory') {
//     for (var i = 0; i < str_array.length; i++) {
//       str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//       let cate = await db.tag.findOne({ name: { $eq: str_array[i] } })
//       if (cate) {
//         ids.push(cate._id)
//       }
//     }
//     return ids;
//   }
// }

// async function getSources(str) {
//   let arr = []
//   var str_array = str.split('and');
//   for (var i = 0; i < str_array.length; i++) {
//     str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//     arr.push(str_array[i])
//   }
//   return arr
// }

// async function getSourcesUrl(str) {
//   let arr = []
//   var str_array = str.split(';');
//   for (var i = 0; i < str_array.length; i++) {
//     str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//     arr.push(str_array[i])
//   }
//   return arr
// }
const getProgramsByUser = async (query, context) => {
  const log = context.logger.start(`services:programs:getProgramsByUser`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  if (!query.userId) {
    throw new Error('userId is  required')
  }
  let user = await db.user.findById(query.userId)
  if (!user) {
    throw new Error(
      'provider not found, So without provider programs not possible'
    )
  }
  // let programs = await db.program.find({ user: query.userId }).sort({ createdOn: -1 }).populate('tags').skip(skipCount).limit(pageSize);
  const programs = await db.program.aggregate([
    {
      $match: {
        user: ObjectId(query.userId),
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryId',
      },
    },
    {
      $lookup: {
        from: 'providers',
        localField: 'user',
        foreignField: 'user',
        as: 'provider',
      },
    },
    {
      $lookup: {
        from: "tags",
        let: { "subCategoryIds": "$subCategoryIds" },
        // pipeline: [
        //   { "$match": { "$expr": { "$in": ["$_id", "$$subCategoryIds"] } } }
        // ],
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ['$_id', { $ifNull: ['$$subCategoryIds', []] }] },
                ]
              }
            }
          }
        ],
        as: "subCategoryIds"
      }
    },
    { $limit: pageSize + skipCount },
    { $skip: skipCount },
  ])
  programs.count = await db.program.find({ user: query.userId }).count()
  log.end()
  let favourites
  if (user) {
    favourites = await db.favourite
      .find({ user: query.userId })
      .populate('program')
  }
  if (favourites) {
    // add fav in program
    for (var p = 0; p < programs.length; p++) {
      for (var f = 0; f < favourites.length; f++) {
        if (
          favourites[f].program !== null &&
          favourites[f].program !== undefined
        ) {
          if (programs[p]._id == favourites[f].program.id) {
            programs[p].isFav = true
          }
        }
      }
    }
  }
  return programs
}
const freeTrail = async (query, context) => {
  const log = context.logger.start(`services:providers:freeTrail`)

  let program = await db.program.findById(query.programId)
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  program.isFreeTrial = query.isFreeTrial
  program.updatedOn = new Date()
  log.end()
  program.save()
  return program
}

const bulkPublishOrUnpublish = async (model, context) => {
  const log = context.logger.start(`services:providers:bulkPublishOrUnpublish`)
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  if (model.programIds.length <= 0) {
    throw new Error('program ids are required to make publish or unpublish')
  }
  if (model.programIds.length > 0) {
    for (let id of model.programIds) {
      let program = await db.program.findById(id)
      program.isPublished = model.isPublished
      program.updatedOn = new Date()
      await program.save()
    }
  }
  log.end()
  if (model.isPublished) { return "published" }
  else { return "unpublished" }
}

const getExpiredByProvider = async (query, context) => {
  const log = context.logger.start(`services:programs:getExpiredByProvider`)
  let pageNo = Number(query.pageNo) || 1
  let pageSize = Number(query.pageSize) || 10
  let skipCount = pageSize * (pageNo - 1)
  if (!query.userId) {
    throw new Error('userId is  required')
  }
  let user = await db.user.findById(query.userId)
  if (!user) {
    throw new Error(
      'provider not found, So without provider programs not possible'
    )
  }
  // let programs = await db.program.find({ user: query.userId }).sort({ createdOn: -1 }).populate('tags').skip(skipCount).limit(pageSize);
  const programs = await db.program.aggregate([
    {
      $match: {
        user: ObjectId(query.userId),
        isExpired: true
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryId',
      },
    },
    {
      $lookup: {
        from: 'providers',
        localField: 'user',
        foreignField: 'user',
        as: 'provider',
      },
    },
    { $limit: pageSize + skipCount },
    { $skip: skipCount },
  ])
  programs.count = await db.program.find({ user: query.userId, isExpired: true }).count()
  log.end()
  return programs
}

const bulkExpire = async (model, context) => {
  const log = context.logger.start(`services:providers:bulkExpire`)
  if (context.user.role == 'parent') {
    throw new Error('you are not authorized to perform this operation')
  }
  if (model.programIds.length <= 0) {
    throw new Error('program ids are required in order to expire program')
  }
  if (model.programIds.length > 0) {
    for (let id of model.programIds) {
      let program = await db.program.findById(id)
      program.isPublished = false
      program.isExpired = true
      program.updatedOn = new Date()
      await program.save()
    }
  }
  log.end()
  return "programs expired successfully"
}


exports.create = create
exports.getAllprograms = getAllprograms
exports.update = update
exports.getById = getById
exports.removeById = removeById
exports.uploadTimeLinePics = uploadTimeLinePics
exports.search = search
exports.getProgramsByProvider = getProgramsByProvider
exports.addProgramAction = addProgramAction
exports.getViewCount = getViewCount
exports.getProgramCount = getProgramCount
exports.setActiveOrDecactive = setActiveOrDecactive
exports.getGraphData = getGraphData
exports.getFilterProgram = getFilterProgram
exports.importProgram = importProgram
exports.getProgramsByDate = getProgramsByDate
exports.publishedOrUnPublishedPrograms = publishedOrUnPublishedPrograms
exports.openPrograms = openPrograms
exports.publish = publish
exports.listPublishOrUnpublish = listPublishOrUnpublish
exports.searchByNameAndDate = searchByNameAndDate
exports.uploadExcel = uploadExcel
exports.topRating = topRating
exports.multiFilter = multiFilter
exports.nearBy = nearBy
exports.subCategoryFilter = subCategoryFilter
exports.duplicateCreate = duplicateCreate;
exports.childTagProgramCount = childTagProgramCount;
exports.expireProgram = expireProgram;
exports.expiresInWeek = expiresInWeek;
exports.searchByKeyValue = searchByKeyValue;
exports.getExpiredprograms = getExpiredprograms;
exports.montclairPrograms = montclairPrograms;
exports.histogram = histogram;
exports.groupPublishOrUnpublish = groupPublishOrUnpublish;
exports.freeTrail = freeTrail;
exports.getProgramsByUser = getProgramsByUser;
exports.bulkPublishOrUnpublish = bulkPublishOrUnpublish;
exports.getExpiredByProvider = getExpiredByProvider;
exports.bulkExpire = bulkExpire;