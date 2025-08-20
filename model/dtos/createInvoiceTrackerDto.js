const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const createInvoiceTrackerSchema = Joi.object({
    name: Joi.string().required(),
    dueDate: Joi.number().required()
});

class CreateInvoiceTrackerDto extends Dto {
    name;
    dueDate;

    constructor(name = '', dueDate = 0) {
        super();
        this.name = name;
        this.dueDate = dueDate;

        const error = createInvoiceTrackerSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    };
}

class EmptyInvoiceTrackerDto extends Dto {
    name;
    dueDate;

    constructor(name = '', dueDate = 0) {
        super();
        this.name = name;
        this.dueDate = dueDate;
    };
}


module.exports = {CreateInvoiceTrackerDto, EmptyInvoiceTrackerDto, createInvoiceTrackerSchema};