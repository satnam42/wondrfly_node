module.exports = [
  {
    url: '/add',
    post: {
      summary: 'add',
      description: 'add program',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Model of program creation',
          required: true,
          schema: {
            $ref: '#/definitions/programAdd',
          },
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/list',
    get: {
      summary: 'get program List',
      description: 'get All program',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/update/{id}',
    put: {
      summary: 'Update',
      description: 'update program details',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'program id',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          description: 'Model of program update',
          required: true,
          schema: {
            $ref: '#/definitions/programAdd',
          },
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/getById/{id}',
    get: {
      summary: 'getById',
      description: 'program details by id ',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'program id',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/delete/{id}',
    delete: {
      summary: 'delete',
      description: 'delete program by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'program id',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/search',
    get: {
      summary: 'search',
      description: 'program search  ',
      parameters: [
        {
          in: 'query',
          name: 'name',
          description: 'program name',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/byProvider',
    get: {
      summary: 'byProvider',
      description: 'program by Provider id ',
      parameters: [
        {
          in: 'query',
          name: 'userId',
          description: 'user id',
          required: true,
          type: 'string',
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: true,
        //     type: "string"
        // }
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/addClick',
    post: {
      summary: 'addClick',
      description: 'add Click',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Model of click creation',
          required: true,
          schema: {
            $ref: '#/definitions/clickAdd',
          },
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/addProgramAction',
    post: {
      summary: 'addProgramAction ',
      description: 'add Program Action like click ,view favourite',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Model of view creation',
          required: true,
          schema: {
            $ref: '#/definitions/programActionCounterAdd',
          },
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/getViewsCount',
    get: {
      summary: 'getViewsCount',
      description: 'program view count ',
      parameters: [
        {
          in: 'query',
          name: 'userId',
          description: 'user id',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/count',
    get: {
      summary: 'count',
      description: 'provider program  count ',
      parameters: [
        {
          in: 'query',
          name: 'userId',
          description: 'user id',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/activeOrDecactive',
    put: {
      summary: 'activeOrDecactive',
      description: 'set program status active or inactive ',
      parameters: [
        {
          in: 'query',
          name: 'id',
          description: 'program id',
          required: true,
          type: 'string',
        },
        {
          in: 'query',
          name: 'status',
          description: 'active/inactive',
          required: true,
          type: 'string',
        },

        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/getGraphData',
    get: {
      summary: 'activeOrDecactive',
      description: 'set program status active or inactive ',
      parameters: [
        {
          in: 'query',
          name: 'id',
          description: 'provider id',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/byFilter',
    get: {
      summary: 'filter',
      description: 'get programd bby filter ',
      parameters: [
        {
          in: 'query',
          name: 'fromDate',
          description: 'fromDate',
          // required: true,
          type: 'date',
        },
        {
          in: 'query',
          name: 'toDate',
          description: 'toDate',
          // required: true,
          type: 'date',
        },
        {
          in: 'query',
          name: 'toTime',
          description: 'toTime',
          // required: true,
          type: 'integer',
        },
        {
          in: 'query',
          name: 'fromTime',
          description: 'fromTime',
          // required: true,
          type: 'integer',
        },
        {
          in: 'query',
          name: 'ageFrom',
          description: 'ageFrom',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'ageTo',
          description: 'ageTo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'priceFrom',
          description: 'priceFrom',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'priceTo',
          description: 'priceTo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'durationMin',
          description: 'durationMin',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'durationMax',
          description: 'durationMax',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'categoryId',
          description: 'category id',
          type: 'string',
        },
        {
          in: 'query',
          name: 'type1',
          description: 'type of program',
          type: 'string',
        },
        {
          in: 'query',
          name: 'type2',
          description: 'type of program',
          type: 'string',
        },
        {
          in: 'query',
          name: 'pageSize',
          description: 'pageSize',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'pageNo',
          description: 'pageNo',
          type: 'integer',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/import',
    post: {
      summary: 'upload  program csv ',
      description: 'upload program csv ',
      parameters: [
        {
          in: 'formData',
          name: 'csv',
          type: 'file',
          description: 'The file to upload.',
          required: true,
        },
        // {
        //     in: "header",
        //     name: "x-access-token",
        //     description: "token to access api",
        //     required: true,
        //     type: "string"
        // }
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: '/getProgramsByDate',
    get: {
      summary: "get Program's list date wise",
      description: "get Program's list date wise",
      parameters: [
        {
          in: 'query',
          name: 'fromDate',
          description: 'Date belongs From date',
          type: 'string',
        },
        {
          in: 'query',
          name: 'toDate',
          description: 'Date belongs To date',
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: '/publishedOrUnPublishedPrograms',
    get: {
      summary: 'publishedOrUnPublishedPrograms',
      description: 'Publish program details by user ID',
      parameters: [
        {
          in: 'query',
          name: 'userId',
          description: 'user Id',
          type: 'string',
        },
        {
          in: 'query',
          name: 'programType',
          description: 'program type can be published or unpublished',
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/openPrograms',
    get: {
      summary: 'get open programs List',
      description: 'get open programs',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: '/publish',
    put: {
      summary: 'published the program',
      description: 'published the program',
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'programId',
          description: 'program Id',
          required: true,
        },
        {
          in: 'query',
          type: 'boolean',
          name: 'isPublished',
          description: 'isPublished should be true or false',
          default: true,
          required: true,
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: '/listPublishOrUnpublish',
    get: {
      summary: 'list of published or unpublished programs',
      description: 'list of published or unpublished programs',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        {
          in: 'query',
          type: 'string',
          name: 'programType',
          description: 'program type can be published or unpublished',
          required: true,
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: '/searchByNameAndDate',
    get: {
      summary: 'search activities',
      description: 'search programs by name or date or by both',
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'programName',
          description: 'program name',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },

  {
    url: "/uploadExcel",
    post: {
      summary: "upload ",
      description: "upload excel sheet data",
      parameters: [
        {
          in: "formData",
          name: "csv",
          type: "file",
          description: "The file to upload.",
          required: true,
        }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error"
          }
        }
      }
    }
  },

  {
    url: "/topRating",
    get: {
      summary: "get programs list of high rated providers",
      description: "get programs list of high rated providers",
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error"
          }
        }
      }
    }
  },
  {
    url: '/multiFilter',
    get: {
      summary: 'multi filter',
      description: 'get programs by multi filter ',
      parameters: [
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          type: 'string',
        },
        {
          in: 'query',
          name: 'providerId',
          description: 'provider id',
          type: 'string',
        },
        {
          in: 'query',
          name: 'fromDate',
          description: 'fromDate',
          // required: true,
          type: 'date',
        },
        {
          in: 'query',
          name: 'toDate',
          description: 'toDate',
          // required: true,
          type: 'date',
        },
        // {
        //   in: 'query',
        //   name: 'toTime',
        //   description: 'toTime',
        //   // required: true,
        //   type: 'integer',
        // },
        // {
        //   in: 'query',
        //   name: 'fromTime',
        //   description: 'fromTime',
        //   // required: true,
        //   type: 'integer',
        // },
        {
          in: 'query',
          name: 'time',
          description: 'Enter time like this:--- early-morning,morning,afternoon,late-afternoon,evening',
          // required: true,
          type: 'string',
        },
        {
          in: 'query',
          name: 'ageFrom',
          description: 'ageFrom',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'ageTo',
          description: 'ageTo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'priceFrom',
          description: 'priceFrom',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'priceTo',
          description: 'priceTo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'ratingFrom',
          description: 'ratingFrom',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'ratingTo',
          description: 'ratingTo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'durationMin',
          description: 'durationMin',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'durationMax',
          description: 'durationMax',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'categoryId',
          description: 'category id',
          type: 'string',
        },
        {
          in: 'query',
          name: 'type',
          description: 'types of program are:-- Drops -in,Semesters,Camps,Other',
          type: 'string',
        },
        {
          in: 'query',
          name: 'pageSize',
          description: 'pageSize',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'pageNo',
          description: 'pageNo',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'inpersonOrVirtual',
          description: 'plz enter:-- inperson or online',
          type: 'string',
        },
        {
          in: 'query',
          name: 'day',
          description: 'days name like:- monday, tuesday, wednesday, thursday, friday, saturday, sunday',
          type: 'string',
        },
        {
          in: 'query',
          name: 'tagsIds',
          description: 'enter tagsIds separated by commas',
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: "/nearBy",
    get: {
      summary: "near by location",
      description: "get programs near by location",
      parameters: [
        {
          in: 'query',
          name: 'lat',
          description: 'lat',
          required: true,
          type: 'string',
        },
        {
          in: 'query',
          name: 'lng',
          description: 'lng',
          required: true,
          type: 'string',
        }
      ],
      responses: {
        default: {
          description: "Unexpected error",
          schema: {
            $ref: "#/definitions/Error"
          }
        }
      }
    }
  },
  {
    url: '/subCategoryFilter',
    get: {
      summary: 'subcategory filter',
      description: 'get programs by subcategory filter ',
      parameters: [
        {
          in: 'query',
          name: 'subId1',
          description: 'sub category id 1',
          type: 'string',
        },
        {
          in: 'query',
          name: 'subId2',
          description: 'sub category id 2',
          type: 'string',
        },
        {
          in: 'query',
          name: 'subId3',
          description: 'sub category id 3',
          type: 'string',
        },
        {
          in: 'query',
          name: 'subId4',
          description: 'sub category id 4',
          type: 'string',
        },
        {
          in: 'query',
          name: 'subId5',
          description: 'sub category id 5',
          type: 'string',
        },
        {
          in: 'query',
          name: 'pageSize',
          description: 'pageSize',
          type: 'integer',
        },
        {
          in: 'query',
          name: 'pageNo',
          description: 'pageNo',
          type: 'integer',
        },

      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/duplicateCreate/{id}',
    put: {
      summary: 'duplicateCreate',
      description: 'Create duplicate program',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'program id',
          required: true,
          type: 'string',
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/childTagProgramCount',
    get: {
      summary: 'count',
      description: 'get programs count by child age range and Tag id',
      parameters: [
        {
          in: 'query',
          name: 'tagId',
          description: 'tag id',
          required: true,
          type: 'string',
        },
        {
          in: 'query',
          name: 'maxAge',
          description: 'maxAge',
          type: 'integer',
        },

      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/expireProgram',
    post: {
      summary: 'expire program',
      description: 'expire program',
      parameters: [
        {
          in: 'body',
          name: 'body',
          description: 'Model to expire program',
          required: true,
          schema: {
            $ref: '#/definitions/expire-program',
          },
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/expiresInWeek',
    get: {
      summary: 'get programs expiring in week',
      description: 'get list of programs expiring with in week',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/searchByKeyValue',
    get: {
      summary: 'search program',
      description: 'search programs by name or address or type',
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'keyType',
          description: 'key type',
        },
        {
          in: 'query',
          type: 'string',
          name: 'keyValue',
          description: 'key value',
        }
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/expired',
    get: {
      summary: 'list expired programs',
      description: 'get list of expired programs',
      parameters: [

      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/montclairPrograms',
    get: {
      summary: 'Montclair programs',
      description: 'get list of all montclair programs',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        }
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/histogram',
    get: {
      summary: 'histogram',
      description: 'get programs data to show in histogram',
      parameters: [
        {
          in: 'query',
          name: 'period',
          description: 'week, month, year',
          type: 'string',
        },
        {
          in: 'query',
          name: 'fromDate',
          description: 'fromDate',
          type: 'date',
        },
        {
          in: 'query',
          name: 'toDate',
          description: 'toDate',
          type: 'date',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/groupPublishOrUnpublish',
    get: {
      summary: 'grouping list of published or unpublished programs',
      description: 'grouping list of published or unpublished programs',
      parameters: [
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        {
          in: 'query',
          type: 'string',
          name: 'programType',
          description: 'program type can be published or unpublished',
          required: true,
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/byUser',
    get: {
      summary: 'byProvider in admin',
      description: 'program by Provider id in admin panel',
      parameters: [
        {
          in: 'query',
          name: 'userId',
          description: 'user id',
          required: true,
          type: 'string',
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageNo',
          description: 'pageNo',
          required: true,
        },
        {
          in: 'query',
          type: 'integer',
          name: 'pageSize',
          description: 'pageSize',
          required: true,
        },
        {
          in: "header",
          name: "x-access-token",
          description: "token to access api",
          required: true,
          type: "string"
        }
      ],

      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  },
  {
    url: '/freeTrail',
    put: {
      summary: 'freeTrail the program',
      description: 'freeTrail the program',
      parameters: [
        {
          in: 'query',
          type: 'string',
          name: 'programId',
          description: 'program Id',
          required: true,
        },
        {
          in: 'query',
          type: 'boolean',
          name: 'isFreeTrial',
          description: 'isFreeTrial should be true or false',
          default: true,
          required: true,
        },
        {
          in: 'header',
          name: 'x-access-token',
          description: 'token to access api',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        default: {
          description: 'Unexpected error',
          schema: {
            $ref: '#/definitions/Error',
          },
        },
      },
    },
  }
]
