const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const createDocumentSchema = Joi.object({
    documentPath: Joi.string().required(),
    type: Joi.number().required(),
    invoiceId: Joi.number().required()
});

class CreateDocumentDto extends Dto {
    documentPath;
    type;
    invoiceId;

    constructor(documentPath, type, invoiceId) {
        super();
        this.documentPath = documentPath;
        this.type = type;
        this.invoiceId = invoiceId;

        const error = createDocumentSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    };
}

class EmptyDocumentDto extends Dto {
    documentPath;
    type;
    invoiceId;

    constructor(documentPath, type, invoiceId) {
        super();
        this.documentPath = documentPath;
        this.type = type;
        this.invoiceId = invoiceId;
    };
}


module.exports = {CreateDocumentDto, EmptyDocumentDto, createDocumentSchema};