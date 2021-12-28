'use strict'
const ObjectId = require('mongodb').ObjectID
var moment = require('moment') // require for date formating
const csv = require('csvtojson')
const fs = require('fs')
const baseUrl = require('config').get('image').baseUrl
var xlsxtojson = require("xlsx-to-json");


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
    user: model.userId,
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
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()
  const notification = await new db.notification({
    title: 'creating program',
    description: 'Congratulations! your program is created successfully',
    user: model.userId,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save()

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
    model.ageGroup.from
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
  if (model.days.length) {
    program.days = model.days
  }
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
    .sort({ createdOn: -1 })
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
    { $limit: pageSize },
    { $skip: skipCount },
  ])

  programs.count = await db.program.find({ user: query.userId }).count()
  log.end()
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
  if (
    program.name == '' ||
    program.name == 'string' ||
    program.type == '' ||
    program.type == 'string' ||
    program.description == '' ||
    program.description == 'string' ||
    program.date.from == '' ||
    program.date.from == 'string' ||
    program.location == '' ||
    program.location == 'string' ||
    program.ageGroup.from == '' ||
    program.ageGroup.from == 'string'
  ) {
    throw new Error('you need to complete the program before publish it')
  }
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
      { $limit: pageSize },
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
      .skip(skipCount)
      .limit(pageSize)
    programs.count = await db.program.find({ isPublished: false }).count()
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
        .find({ subCategoryIds: tag[0]._id }).populate('categoryId').populate('subCategoryIds').populate('user').limit(10)
    }
    let category = await db.category.find({ name: { $regex: '.*' + programName + '.*', $options: 'i' } }).limit(5)
    if (category.length >= 1) {
      categoryPrograms = await db.program
        .find({ categoryId: category[0]._id }).populate('categoryId').populate('subCategoryIds').populate('user').limit(10)
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
  const users = await db.user.find({ averageFinalRating: { $gte: 4.0, $lte: 5.0 } });
  let totalPrograms = []
  for (let user of users) {
    console.log(user.id);
    const programs = await db.program.find({ user: user.id })
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
    totalPrograms.push(...programs)
  }
  log.end()
  return totalPrograms
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
    query["date.from"] = { $gte: model.fromDate }
    query["date.to"] = { $lte: model.toDate }
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
      $gte: model.priceFrom,
      $lte: model.priceTo,
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
      $gte: model.ratingFrom,
      $lte: model.ratingTo,
    }
    query["programRating"] = byRating
  }

  if (model.categoryId !== undefined && model.categoryId !== "" && model.categoryId !== null) {
    query["categoryId"] = model.categoryId;
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
    query["inpersonOrVirtual"] = 'virtual'
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
    console.log('tagsIds ==>>>>>', model.tagsIds)
    const tagsArray = []
    var tagArr = model.tagsIds.split(',');
    for (const element of tagArr) {
      tagsArray.push(element)
    }
    // const tags = { subCategoryIds: { $in: tagsArray } }
    query["subCategoryIds"] = { $in: tagsArray }
  }
  // if (model.ageFrom || model.fromDate || model.toTime || model.priceFrom || model.durationMin || model.categoryId || model.type1 || model.type2) {
  //   query["isPublished"] = true
  // }

  const isEmpty = Object.keys(query).length === 0
  let programs
  if (!isEmpty) {
    programs = await db.program.find(query)
      .populate('tags')
      .populate('categoryId')
      .populate('subCategoryIds')
      .populate('user')
      .skip(skipCount)
      .limit(pageSize)
      .skip(skipCount).limit(pageSize);
    log.end()
  }
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
  return programs
}
// db.contributor.find({
//   $and: [{ branch: "CSE" },
//   { joiningYear: 2018 }]
// })
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
const addExcelPrograms = async (model, context, categoriesIds, subcategoriesIds, sourcs, sourcsUrl, age) => {
  // const addExcelPrograms = async (model, context, sourcs, sourcsUrl, age) => {
  const log = context.logger.start(`services:programs:build${model}`)
  let word
  if (model.name) {
    word = humanize(model.name);
  }
  let isPublished = true
  let realTime = {}
  realTime.from = model.startTime;
  realTime.to = model.endTime;
  let date = {}
  date.from = model.startDate;
  date.to = model.endDate;
  // if (
  //   model.name != '' &&
  //   model.name != 'string' &&
  // ) {
  //   isPublished = true
  // }
  const program = await new db.program({
    name: model.name,
    description: model.description,
    providerName: model.providerName,
    indoorOroutdoor: model.indoorOroutdoor,
    inpersonOrVirtual: model.inpersonOrVirtual,
    source: sourcs,
    sourceUrl: sourcsUrl,
    city: model.city,
    cycle: model.cycle,
    activeStatus: model.activeStatus,
    alias: word ? word : '',

    type: model.type,
    price: model.price,
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
    emails: model.emails,
    batches: model.batches,
    programImage: model.programImage,
    isPublished,
    inpersonOrVirtual: model.inpersonOrVirtual,
    days: model.days,
    specialInstructions: model.specialInstructions,
    parentRequired: model.parentRequired,
    dbStatus: model.dbStatus,
    sessionLength: model.sessionLength,

    // status: model.status || 'active',
    user: model.user,
    addresses: model.addresses,
    // categoryId: categoriesIds,
    subCategoryIds: subcategoriesIds,
    categoryId: model.categoryId,
    // subCategoryIds: model.subCategoryIds,
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

// get categories and subcategories id's function ====
async function getIds(str, type) {
  let ids = []
  var str_array = str.split(',');
  if (type == 'category') {
    console.log(' ========categories')
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

async function getAge(str) {
  let ageGroup = {}
  var str_array = str.split(' - ');
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
      result.forEach(async function (record) {
        console.log('record', record.source, record.sourceUrl, record.categoryId, record.subCategoryIds)
        // categries = await getIds(record.categoryId, 'category');
        subcategries = await getIds(record.subCategoryIds, 'subcategory');
        sourcs = await getSources(record.source, 'source');
        sourcsUrl = await getSourcesUrl(record.sourceUrl, 'sourceUrl');
        age = await getAge(record.ageGroup)
        addExcelPrograms(record, context, categries, subcategries, sourcs, sourcsUrl, age)
        // addExcelPrograms(record, context, sourcs, sourcsUrl, age)
      });
    }
  });
  log.end();
  await fs.unlinkSync(file.path)
  return "excel file uploaded successfully"
};

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