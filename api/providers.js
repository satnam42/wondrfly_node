'use strict'
const service = require('../services/providers')
const response = require('../exchange/response')
const userMapper = require('../mappers/user')
const mapper = require('../mappers/provider')

const create = async (req, res) => {
  const log = req.context.logger.start(`api:provider:create`)
  try {
    const tag = await service.importProvider(req.file, req.context)
    log.end()
    return response.data(res, tag)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const add = async (req, res) => {
  const log = req.context.logger.start(`api:provider:addProvider`)
  try {
    const provider = await service.addProvider(req.body, req.context)
    log.end()
    return response.data(res, provider)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const list = async (req, res) => {
  const log = req.context.logger.start(`api:providers:list`)
  try {
    const providers = await service.getAllProvider(req.query, req.context)
    let message = providers.count ? providers.count : 0 + ' ' + 'providers Got'
    log.end()
    return response.page(
      message,
      res,
      providers,
      Number(req.query.pageNo) || 1,
      Number(req.query.pageSize) || 10,
      providers.count
    )
    // return response.data(res, providers);
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const update = async (req, res) => {
  const log = req.context.logger.start(`api:providers:update:${req.params.id}`)
  try {
    const provider = await service.updateProvider(
      req.params.id,
      req.body,
      req.context
    )
    log.end()
    return response.data(res, provider)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const uploadBannerPic = async (req, res) => {
  const log = req.context.logger.start(`api:provider:uploadBannerPic`)
  try {
    const user = await service.uploadBannerPic(
      req.params.id,
      req.files,
      req.context
    )
    const message = 'upload Banner Successfully'
    log.end()
    return response.success(res, message, user)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const getById = async (req, res) => {
  const log = req.context.logger.start(`api:providers:getById:${req.params.id}`)
  try {
    const provider = await service.getProvideById(req.params.id, req.context)
    log.end()
    return response.data(res, mapper.toModel(provider))
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const providerByEmailId = async (req, res) => {
  const log = req.context.logger.start(
    `api:providers:providerByEmailId:${req.query.email}`
  )
  try {
    const provider = await service.getProvideByEmail(
      req.query.email,
      req.context
    )
    log.end()
    return response.data(res, provider)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const searchProvider = async (req, res) => {
  const log = req.context.logger.start(
    `api:providers:getById:${req.query.name}`
  )
  try {
    const providers = await service.search(req.query.name, req.context)
    log.end()
    return response.data(res, providers)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const report = async (req, res) => {
  const log = req.context.logger.start(`api:providers:report:${req.query.id}`)
  try {
    const providers = await service.getReport(req.query, req.context)
    log.end()
    return response.data(res, providers)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const providersByFilter = async (req, res) => {
  const log = req.context.logger.start(`api:providers:getProvidersByFilter`)
  try {
    const providers = await service.getProvidersByFilter(req.query, req.context)
    log.end()
    return response.data(res, providers)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const dublicateProviders = async (req, res) => {
  const log = req.context.logger.start(`api:providers:dublicateProviders`)
  try {
    const providers = await service.getDupicate(req.query, req.context)
    log.end()
    return response.data(res, providers)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const margeDublicateProviders = async (req, res) => {
  const log = req.context.logger.start(`api:providers:margeDublicateProviders`)
  try {
    const provider = await service.margeDupicate(req.body, req.context)
    log.end()
    return response.data(res, provider)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const getProvidersByDate = async (req, res) => {
  const log = req.context.logger.start(`api:providers:getProvidersByDate`)
  try {
    const providers = await service.getProvidersByDate(req.query, req.context)
    log.end()
    return response.data(res, providers)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const govtId = async (req, res) => {
  const log = req.context.logger.start(`api:providers:govtId`)
  try {
    const provider = await service.govtId(req.body, req.context)
    log.end()
    return response.data(res, provider)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const deletePhoneNumber = async (req, res) => {
  const log = req.context.logger.start(`api:providers:deletePhoneNumber`)
  try {
    const user = await service.deletePhoneNumber(req.query.id, req.context)
    log.end()
    return response.data(res, user)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const isVerifiedOrNot = async (req, res) => {
  const log = req.context.logger.start(`api:providers:isVerifiedOrNot`)
  try {
    const providers = await service.isVerifiedOrNot(req.query, req.context)
    let message = providers.count ? providers.count : 0 + ' ' + 'providers Got'
    log.end()
    return response.page(
      message,
      res,
      userMapper.toSearchModel(providers),
      Number(req.query.pageNo) || 1,
      Number(req.query.pageSize) || 10,
      providers.count
    )
    // return response.data(res, providers);
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const searchVerifiedOrUnverified = async (req, res) => {
  const log = req.context.logger.start(
    `api:providers:searchVerifiedOrUnverified:${req.query}`
  )
  try {
    const providers = await service.searchVerifiedOrUnverified(
      req.query,
      req.context
    )
    log.end()
    return response.data(res, userMapper.toSearchModel(providers))
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const uploadExcel = async (req, res) => {
  const log = req.context.logger.start(`api:providers:uploadExcel`);
  try {
    const url = await service.uploadExcel(req.file, req.context);
    log.end();
    return response.data(res, url);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const getRatingByUser = async (req, res) => {
  const log = req.context.logger.start(`api:providers:getRatingByUser:${req.params.id}`)
  try {
    const rating = await service.getRatingByUser(req.params.id, req.context)
    log.end()
    return response.data(res, rating)
  } catch (err) {
    log.error(err)
    log.end()
    return response.failure(res, err.message)
  }
}

const montclairProviders = async (req, res) => {
  const log = req.context.logger.start(`api:providers:montclairProviders`);
  try {
    const providers = await service.montclairProviders(req.query, req.context);
    let message = providers.count ? providers.count : 0 + " " + "providers Got";
    log.end();
    return response.page(
      message,
      res,
      userMapper.toSearchModel(providers),
      Number(req.query.pageNo) || 1,
      Number(req.query.pageSize) || 10,
      providers.count
    )
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const histogram = async (req, res) => {
  const log = req.context.logger.start(`api:providers:histogram:${req.query.userId}`);
  try {
    const data = await service.histogram(req.query, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const saveProvider = async (req, res) => {
  const log = req.context.logger.start(`api:providers:saveProvider`);
  try {
    const favourite = await service.saveProvider(req.body, req.context);
    log.end();
    return response.data(res, favourite);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const freeTrail = async (req, res) => {
  const log = req.context.logger.start(`api:providers:freeTrail`);
  try {
    const program = await service.freeTrail(req.query, req.context);
    log.end();
    return response.data(res, program);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

exports.create = create
exports.list = list
exports.update = update
exports.uploadBannerPic = uploadBannerPic
exports.getById = getById
exports.providerByEmailId = providerByEmailId
exports.searchProvider = searchProvider
exports.add = add
exports.report = report
exports.providersByFilter = providersByFilter
exports.dublicateProviders = dublicateProviders
exports.margeDublicateProviders = margeDublicateProviders
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