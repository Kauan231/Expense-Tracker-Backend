const Joi = require('joi');

const readDocumentSchema = Joi.object({
    documentPath: Joi.string(),
    type: Joi.number(),
    invoiceId: Joi.number()
});


module.exports = readDocumentSchema;