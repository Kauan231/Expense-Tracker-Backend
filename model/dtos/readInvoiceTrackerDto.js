const Joi = require('joi');

const readInvoiceTrackerSchema = Joi.object({
    name: Joi.string(),
    dueDate: Joi.number()
});


module.exports = readInvoiceTrackerSchema;