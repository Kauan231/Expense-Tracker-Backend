const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const createInvoiceSchema = Joi.object({
    date: Joi.date().required(),
    cost: Joi.number().required(),
    status: Joi.number().required(),
    invoiceTrackerId: Joi.number().required()
});

class CreateInvoiceDto extends Dto {
    date;
    cost;
    status;
    invoiceTrackerId;

    constructor(date, cost, status, invoiceTrackerId) {
        super();
        this.date = date;
        this.cost = cost;
        this.status = status;
        this.invoiceTrackerId = invoiceTrackerId;

        const error = createInvoiceSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    };
}

class EmptyInvoiceDto extends Dto {
    date;
    cost;
    status;
    invoiceTrackerId;

    constructor(date, cost, status, invoiceTrackerId) {
        super();
        this.date = date;
        this.cost = cost;
        this.status = status;
        this.invoiceTrackerId = invoiceTrackerId;
    };
}


module.exports = {CreateInvoiceDto, EmptyInvoiceDto, createInvoiceSchema};