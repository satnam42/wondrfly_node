'use strict'
const mongoose = require('mongoose')
const programSchema = mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' },
  price: { type: Number, default: '' },
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
  time: {
    from: { type: Date, default: '' },
    to: { type: Date, default: '' },
  },
  bookingCancelledIn: {
    days: { type: String, default: '' },
    hours: { type: String, default: '' },
  },
  lat: { type: String, default: '' },
  lng: { type: String, default: '' },
  duration: { type: String, default: '' },
  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  isFav: { type: Boolean, default: false },
  pricePerParticipant: { type: String, default: '' },
  priceForSiblings: { type: String, default: '' },
  specialInstructions: { type: String, default: '' },
  specialInstructions: { type: String, default: '' },
  adultAssistanceIsRequried: { type: Boolean, default: false },
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
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  sessions: [
    {
      sessionName: { type: String, default: '' },
      sessionAddress: { type: String, default: '' },
      sessionStartDate: { type: Date, default: '' },
      sessionEndDate: { type: Date, default: '' },
      sessionStartTime: { type: Date, default: '' },
      sessionEndTime: { type: Date, default: '' },
      noOfSeats: { type: String, default: '' },
    },
  ],
  programImage: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
})

mongoose.model('program', programSchema)
module.exports = programSchema
