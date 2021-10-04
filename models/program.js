'use strict'
const mongoose = require('mongoose')
const programSchema = mongoose.Schema({
  name: { type: String, default: '' },
  providerName: { type: String, default: '' },
  indoorOroutdoor: { type: String, default: '' },
  inpersonOrVirtual: { type: String, default: '' },
  source: { type: String, default: '' },
  sourceUrl: { type: String, default: '' },
  city: { type: String, default: '' },
  cycle: { type: String, default: '' },
  activeStatus: { type: String, default: '' },
  alias: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' },
  price: { type: Number, default: 0 },
  code: { type: String, default: '' },
  location: { type: String, default: '' },
  joiningLink: { type: String, default: '' },
  presenter: { type: String, default: '' },
  programCoverPic: { type: String, default: '' },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  timelinePics: [{ type: String, default: '' }],
  ageGroup: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 },
  },
  date: {
    from: { type: Date, default: '' },
    to: { type: Date, default: '' },
  },
  isDateNotMention: { type: Boolean, default: false },
  time: {
    from: { type: Date, default: '' },
    to: { type: Date, default: '' },
  },
  realTime: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 },
  },
  isTimeNotMention: { type: Boolean, default: false },
  bookingCancelledIn: {
    days: { type: String, default: '' },
    hours: { type: String, default: '' },
  },
  lat: { type: String, default: '' },
  lng: { type: String, default: '' },
  duration: {
    minutes: { type: Number, default: '' },
    hours: { type: Number, default: '' },
  },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  isFav: { type: Boolean, default: false },
  pricePerParticipant: { type: Number, default: 0 },
  priceForSiblings: { type: String, default: '' },
  specialInstructions: { type: String, default: '' },
  adultAssistanceIsRequried: { type: Boolean, default: false },
  pricePeriod: {
    periodAmount: { type: String, default: '' },
    periodCount: { type: Number, default: 0 },
  },
  capacity: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
  },
  emails: [{ type: String, default: '' }],
  batches: [
    {
      name: { type: String, default: '' },
      startDate: { type: Date, default: '' },
      endDate: { type: Date, default: '' },
      startTime: { type: Date, default: '' },
      endTime: { type: Date, default: '' },
      isFree: { type: Boolean, default: false },
      pricePerParticipant: { type: String, default: '' },
      instructor: { type: String, default: '' },
      numberOfSeats: { type: String, default: '' },
      location: { type: String, default: '' },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  addresses: [{ type: String, default: '' }],
  categoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'category',
    // required: true,
  }],
  subCategoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'tag',
    // required: true,
  }],
  sessions: [
    {
      sessionName: { type: String, default: '' },
      sessionAddress: { type: String, default: '' },
      sessionStartDate: { type: Date, default: '' },
      sessionEndDate: { type: Date, default: '' },
      sessionStartTime: { type: Date, default: '' },
      sessionEndTime: { type: Date, default: '' },
      noOfSeats: { type: String, default: '' },
      instructor: { type: String, default: '' },
    },
  ],
  programImage: { type: String, default: '' },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  days: {
    sunday: { type: Boolean, default: false },
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
  },
  extractionDate: { type: Date, default: '' },
  proofreaderObservation: { type: String, default: '' },
  extractionComment: { type: String, default: '' },
  cyrilComment: { type: String, default: '' },
  cyrilApproval: { type: String, default: '' },
  proofreaderRating: { type: Number, default: '' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
})

mongoose.model('program', programSchema)
module.exports = programSchema
