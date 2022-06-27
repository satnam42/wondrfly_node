module.exports = [
  {
    name: 'providerCreate',
    properties: {
      firstName: {
        type: 'string',
      },
      userName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      type: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      addressLine1: {
        type: 'string',
      },
      addressLine2: {
        type: 'string',
      },
      country: {
        type: 'string',
      },
      street: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
      phoneNumber: {
        type: 'string',
      },
      secondaryPhonenumber: {
        type: 'string',
      },
      // source: {
      //   type: 'string',
      // },
      note: {
        type: 'string',
      },
      website: {
        type: 'string',
      },
      isAmbassador: {
        type: 'boolean',
      },
      location: {
        type: 'string'
      },
      zipCode: { type: 'string' },
      lat: {
        type: 'string',
      },
      lng: {
        type: 'string',
      },
      activeStatus: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      categoryIds: {
        type: 'array',
        items: {
          // type: 'array',
          type: 'string',
          default: '',
          // properties:
          //     { type: "string", default: "" },
        },
      },
      subCategoryIds: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      links: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      cycle: {
        type: 'string',
      },
      healthAndSafety: {
        type: 'array',
        items: {
          properties: {
            disposableMasksProvided: { type: 'boolean' },
            qrCodeRegistration: { type: 'boolean' },
            staffHealthAndHygieneProtocols: { type: 'boolean' },
            dailyEquipment: { type: 'boolean' },
            sanitizerStations: { type: 'boolean' },
            limitedClassSizes: { type: 'boolean' },
            limitedClassSizes: { type: 'boolean' },
            parentObservation: { type: 'boolean' },
          },
        },
      },
      source: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      sourceUrl: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      rating: {
        properties: {
          facebookRating: { type: 'number' },
          numberOfFacebook: { type: 'number' },
          googleRating: { type: 'number' },
          numberOfGoogle: { type: 'number' },
          yelpRating: { type: 'number' },
          numberOfYelp: { type: 'number' },
          instagramFollowers: { type: 'number' },
        },
      },
      cancellation_and_refund: { type: 'string' },
      last_reviewed: { type: 'date' },
      cycle_time: { type: 'number' },
      proof_reader_notes: { type: 'string' }
    },
  },
]
