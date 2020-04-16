const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const ObjectId = require("mongodb").ObjectID;

const set = (model, products, context) => {

    const log = context.logger.start("services:products:set");
    // if (model.name !== "string" && model.name !== undefined) {
    //     products.name = model.name;
    // }
    // if (model.quantity !== "string" && model.quantity !== undefined) {
    //     products.quantity = model.quantity;
    // }
    // if (model.description !== "string" && model.description !== undefined) {
    //     products.description = model.description;
    // }
    // if (model.price !== "string" && model.price !== undefined) {
    //     products.price = model.price;
    // }
    // if (model.quantity !== "string" && model.quantity !== undefined) {
    //     products.quantity = model.quantity;
    // }
    // if (model.category !== "string" && model.category !== undefined) {
    //     products.category = model.category;
    // }
    if (products !== "string" && products !== undefined) {
        products.assignedVendors = products.assignedVendors;
    }
    if (model.variation !== "string" && model.variation !== undefined) {
        products.variation = model.variation;
    }
    log.end();
    products.save();
    return products;
};

const build = async (model, context) => {
    const { name, quantity, description, costPerEach, overAllPrice, note, image, category, variation, assignedVendors, height, width, weight, length, sku, manufacturer } = model;
    const log = context.logger.start(`services:products:build${model}`);
    const products = await new db.products({
        name: name,
        quantity: quantity,
        description: description,
        costPerEach: costPerEach,
        overAllPrice: overAllPrice,
        note: note,
        image: image,
        category: category,
        assignedVendors: assignedVendors,
        variation: variation,
        height: height,
        weight: weight,
        width: width,
        length: length,
        sku: sku,
        manufacturer: manufacturer,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return products;
};

const create = async (model, context) => {
    const log = context.logger.start("services:products:create");
    const products = build(model, context);
    log.end();
    return products;
};

const getById = async (id, context) => {
    const log = context.logger.start(`services:products:getById:${id}`);
    const products = await db.products.findById(id);
    log.end();
    return products;
};

const productsByVendor = async (query, context) => {
    const log = context.logger.start(`services:products:get`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.products
        .find({ assignedVendors: { $elemMatch: { vendorId: query.vendorId } } })
        .skip(skipCount)
        .limit(pageSize);
    products.count = await db.products.find({ assignedVendors: { $elemMatch: { vendorId: query.vendorId } } }).count();
    log.end();
    return products;
};

const productList = async (query, context) => {
    const log = context.logger.start(`services:products:get`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.products
        .find({ name })
        .skip(skipCount)
        .limit(pageSize);
    products.count = await db.products.find({}).count();
    log.end();
    return products;
};

const getCategories = async (query, context) => {
    const log = context.logger.start(`services:getCategories:get`);
    const Categories = await db.products.distinct("category")

    log.end();
    return Categories;
};

const productsByCategories = async (query, context) => {
    var categories = query.categories.split(",");
    const log = context.logger.start(`services:productsByCategories:get`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.products
        .find({ $and: [{ assignedVendors: { $elemMatch: { vendorId: query.vendorId } } }, { subCategory: { "$in": categories } }, { category: query.customerGroup }] })
        .skip(skipCount)
        .limit(pageSize);
    products.count = await db.products.find({ $and: [{ assignedVendors: { $elemMatch: { vendorId: query.vendorId } } }, { subCategory: { "$in": categories } }, { category: query.customerGroup }] }).count();
    log.end();
    return products;
};
const search = async (query, context) => {

    const log = context.logger.start(`services:productsByCategories:get`);
    let categories = query.categories.split(",");
    const products = await db.products.find({ "$and": [{ assignedVendors: { $elemMatch: { vendorId: query.vendorId } } }, { name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }, { subCategory: { "$in": categories } }] }).limit(5);

    log.end();
    return products;
};

const update = async (model, context) => {
    const id = context.products.id
    const log = context.logger.start(`services:products:update`);

    let entity = await db.products.findById(id);

    if (!entity) {
        throw new Error("invalid products");
    }
    const products = await set(model, entity, context);
    log.end();
    return products
};

const asignVendor = async (model, id, context) => {
    const log = context.logger.start(`services:products:asignVendor`);
    let entity = await db.products.findById(id);
    if (!entity) {
        throw new Error("invalid products");
    }
    if (entity.assignedVendors.length == 0) {
        entity.assignedVendors.push(model)

    } else {
        entity.assignedVendors.forEach(vendor => {
            if (vendor.vendorId == model.vendorId) {
                return
            } else {
                entity.assignedVendors.push(model)
            }
        });
    }
    const products = await set(model, entity, context);
    log.end();
    return products
};

exports.create = create;
exports.productList = productList;
exports.update = update;
exports.getById = getById;
exports.productsByCategories = productsByCategories;
exports.search = search;
exports.asignVendor = asignVendor;
exports.productsByVendor = productsByVendor;
exports.getCategories = getCategories;