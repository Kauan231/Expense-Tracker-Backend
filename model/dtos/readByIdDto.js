const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const readByIdSchema = Joi.object({
    id: Joi.number().required()
});

class ReadByIdDto extends Dto {
    id;
    constructor(data = { id: 0 }) {
        super();
        this.id = data.id;

        const error = readByIdSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    }
}

module.exports = { ReadByIdDto, readByIdSchema };