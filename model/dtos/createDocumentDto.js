const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const createDocumentSchema = Joi.object({
    documentPath: Joi.string().required(),
    type: Joi.number().required(),
    invoiceId: Joi.number().required(),
    cost: Joi.number()
});

class CreateDocumentDto extends Dto {
    documentPath;
    type;
    invoiceId;
    cost;

    constructor(documentPath, type, invoiceId, cost) {
        super();
        this.documentPath = documentPath;
        this.type = type;
        this.invoiceId = invoiceId;
        this.cost = cost;

        const error = createDocumentSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    };
}

class EmptyDocumentDto extends Dto {
    documentPath;
    type;
    invoiceId;
    cost;

    constructor(documentPath, type, invoiceId, cost) {
        super();
        this.documentPath = documentPath;
        this.type = type;
        this.invoiceId = invoiceId;
        this.cost = cost;
    };
}


module.exports = {CreateDocumentDto, EmptyDocumentDto, createDocumentSchema};