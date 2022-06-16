module.exports = [
  {
    name: 'programAdd',
    properties: {
      name: {
        type: 'string',
      },
      providerName: {
        type: 'string',
      },
      type: {
        type: 'string',
      },
      indoorOroutdoor: {
        type: 'string',
      },
      inpersonOrVirtual: {
        type: 'string',
      },
      source: {
        type: 'string',
      },
      sourceUrl: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      cycle: {
        type: 'string',
      },
      activeStatus: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      type: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      location: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
      presenter: {
        type: 'string',
      },
      time: {
        properties: {
          from: { type: 'number' },
          to: { type: 'number' },
        },
      },
      realTime: {
        properties: {
          to: { type: 'number' },
          from: { type: 'number' },
        },
      },
      isTimeNotMention: { type: 'boolean' },
      date: {
        properties: {
          to: { type: 'date' },
          from: { type: 'date' },
        },
      },
      isDateNotMention: { type: 'boolean' },
      ageGroup: {
        properties: {
          to: { type: 'number' },
          from: { type: 'number' },
        },
      },
      bookingCancelledIn: {
        properties: {
          day: { type: 'string' },
          hours: { type: 'string' },
        },
      },
      duration: {
        properties: {
          minutes: { type: 'number' },
          hours: { type: 'number' },
        },
      },
      isFree: {
        type: 'boolean',
      },
      pricePerParticipant: {
        type: 'number',
      },
      priceForSiblings: {
        type: 'string',
      },
      lat: {
        type: 'string',
      },
      lng: {
        type: 'string',
      },
      joiningLink: {
        type: 'string',
      },
      specialInstructions: {
        type: 'string',
      },

      programCoverPic: {
        type: 'string',
      },
      programImage: {
        type: 'string',
      },
      adultAssistanceIsRequried: {
        type: 'boolean',
      },
      pricePeriod: {
        properties: {
          periodAmount: { type: 'string' },
          periodCount: { type: 'number' },
        },
      },
      capacity: {
        properties: {
          min: { type: 'number' },
          mix: { type: 'number' },
        },
      },
      emails: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      batches: {
        type: 'array',
        items: {
          properties: {
            name: { type: 'string' },
            startDate: { type: 'date' },
            endDate: { type: 'date' },
            startTime: { type: 'date' },
            endTime: { type: 'date' },
            // isFree: { type: "boolean" },
            // endTime: { type: 'string', },
            pricePerParticipant: { type: 'string' },
            // priceForSiblings: { type: 'string', },
            instructor: { type: 'string' },
            numberOfSeats: { type: 'string' },
            location: { type: 'string' },
          },
        },
      },
      userId: {
        type: 'string',
      },
      addresses: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      categoryId: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      subCategoryIds: {
        type: 'array',
        items: {
          type: 'string',
          default: '',
        },
      },
      extractionDate: {
        type: 'date',
      },
      proofreaderObservation: {
        type: 'string',
      },
      extractionComment: {
        type: 'string',
      },
      cyrilComment: {
        type: 'string',
      },
      cyrilApproval: {
        type: 'string',
      },
      proofreaderRating: {
        type: 'number',
      },
      sessions: {
        type: 'array',
        items: {
          properties: {
            sessionName: { type: 'string' },
            sessionAddress: { type: 'string' },
            sessionStartDate: { type: 'date' },
            sessionEndDate: { type: 'date' },
            sessionStartTime: { type: 'date' },
            sessionEndTime: { type: 'date' },
            noOfSeats: { type: 'string' },
            instructor: { type: 'string' },
          },
        },
      },
      days: {
        properties: {
          sunday: { type: 'boolean' },
          monday: { type: 'boolean' },
          tuesday: { type: 'boolean' },
          wednesday: { type: 'boolean' },
          thursday: { type: 'boolean' },
          friday: { type: 'boolean' },
          saturday: { type: 'boolean' },
        },
      },
      isproRated: { type: 'boolean' },
      isExpired: { type: 'boolean' },
      per_hour_rate: { type: 'string' },
      last_reviewed: { type: 'date' },
      cycle_time: { type: 'number' },
      proof_reader_notes: { type: 'string' },
    },
  },
]
