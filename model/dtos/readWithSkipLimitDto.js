const Joi = require('joi');
const Dto = require('./dto');
const { ValidationError } = require('../../utils/errors');

const readAllWithSkipLimitSchema = Joi.object({
    skip: Joi.number().required(),
    limit: Joi.number().greater(0).required()
});

class ReadAllWithSkipLimitDto extends Dto {
    skip;
    limit;
    constructor(data = { skip: 0, limit: 0 }) {
        super();
        this.skip = Number(data.skip);
        this.limit = Number(data.limit);

        const error = readAllWithSkipLimitSchema.validate(this.toObject()).error;
        if (error) { throw new ValidationError(error.message); }
    }
}

module.exports = { ReadAllWithSkipLimitDto, readAllWithSkipLimitSchema };