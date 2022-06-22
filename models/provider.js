'use strict'
const mongoose = require('mongoose')
const provider = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  userName: { type: String, default: '' },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      // required: true
    },
  ],
  subCategoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'tag',
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  county: { type: String, default: '' },
  about: { type: String, default: '' },
  bio: { type: String, default: '' },
  description: { type: String, default: '' },
  facebook: { type: String, default: '' },
  fullAddress: { type: String, default: '' },
  hours: { type: String, default: '' },
  imageURL: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  listingURL: { type: String, default: '' },
  banners: [{ type: String, default: '' }],
  links: [{ type: String, default: '' }],
  cycle: { type: String, default: '' },
  alias: { type: String, default: '' },
  activeStatus: { type: String, default: '' },
  rating:
  {
    facebookRating: { type: Number, default: 0 },
    numberOfFacebook: { type: Number, default: 0 },
    googleRating: { type: Number, default: 0 },
    numberOfGoogle: { type: Number, default: 0 },
    yelpRating: { type: Number, default: 0 },
    numberOfYelp: { type: Number, default: 0 },
    instagramFollowers: { type: Number, default: 0 },
  },
  reviews: { type: String, default: '' },
  twitter: { type: String, default: '' },
  website: { type: String, default: '' },
  youtube: { type: String, default: '' },
  instagram: { type: String, default: '' },
  awards: { type: String, default: '' },
  taxNumber: { type: String, default: '' },
  merchantVerified: { type: Boolean, default: false },
  isAssociate: { type: String, default: '' },
  govtIdUrl: { type: String, default: '' },
  govtIdNote: { type: String, default: '' },
  healthAndSafety: [
    {
      disposableMasksProvided: { type: Boolean, default: false },
      qrCodeRegistration: { type: Boolean, default: false },
      staffHealthAndHygieneProtocols: { type: Boolean, default: false },
      dailyEquipment: { type: Boolean, default: false },
      sanitizerStations: { type: Boolean, default: false },
      limitedClassSizes: { type: Boolean, default: false },
      parentObservation: { type: Boolean, default: false },
      _id: false,
    },
  ],
  lastActive: [{ type: String, default: '' }],
  source: [{ type: String, default: '' }],
  sourceUrl: [{ type: String, default: '' }],
  // tier: { type: String, default: "" },
  createdBy: { type: String, default: '' },
  adminNotes: { type: String, default: '' },
  logo: { type: String, default: '' },
  cancellation_and_refund: { type: String, default: '' },
  last_reviewed: { type: Date, default: '' },
  cycle_time: { type: Number, default: 0 },
  proof_reader_notes: { type: String, default: '' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
})

mongoose.model('provider', provider)
module.exports = provider
