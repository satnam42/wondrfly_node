const formidable = require('formidable')

const extract = (req, context) => {
    const log = context.logger.start('helpers:formidable:extract')

    const form = new formidable.IncomingForm()

    //     form.parse(req, (err, fields, files) => {
    // c
    //     })
    log.end()
    return form
}

exports.extract = extract
