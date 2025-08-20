const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const createInvoiceSchema = Joi.object({
    dueDate: Joi.number().required(),
    month: Joi.number().required(),
    year: Joi.number().required(),
    cost: Joi.number().required(),
    status: Joi.number().required(),
    invoiceTrackerId: Joi.number().required()
});

class CreateInvoiceDto extends Dto {
    dueDate;
    month;
    year;
    cost;
    status;
    invoiceTrackerId;

    constructor(dueDate, month, year, cost, status, invoiceTrackerId) {
        super();
        this.dueDate = dueDate;
        this.month = month;
        this.year = year;
        this.cost = cost;
        this.status = status;
        this.invoiceTrackerId = invoiceTrackerId;

        const error = createInvoiceSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    };
}

class EmptyInvoiceDto extends Dto {
    dueDate;
    month;
    year;
    cost;
    status;
    invoiceTrackerId;

    constructor(dueDate, month, year, cost, status, invoiceTrackerId) {
        super();
        this.dueDate = dueDate;
        this.month = month;
        this.year = year;
        this.cost = cost;
        this.status = status;
        this.invoiceTrackerId = invoiceTrackerId;
    };
}


module.exports = {CreateInvoiceDto, EmptyInvoiceDto, createInvoiceSchema};