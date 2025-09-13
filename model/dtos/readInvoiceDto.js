const Joi = require('joi');

const readInvoiceTrackerSchema = Joi.object({
    date: Joi.date(),
    cost: Joi.number(),
    status: Joi.number(),
    invoiceTrackerId: Joi.number()
});


module.exports = readInvoiceTrackerSchema;