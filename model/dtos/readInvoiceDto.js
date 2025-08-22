const Joi = require('joi');

const readInvoiceTrackerSchema = Joi.object({
    dueDate: Joi.number(),
    month: Joi.number(),
    year: Joi.number(),
    cost: Joi.number(),
    status: Joi.number(),
    invoiceTrackerId: Joi.number()
});


module.exports = readInvoiceTrackerSchema;