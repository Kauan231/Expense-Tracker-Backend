const j2s = require('joi-to-swagger');
const { createInvoiceSchema } = require('../model/dtos/createInvoiceDto');
const readInvoiceSchema = require('../model/dtos/readInvoiceDto');
const { creationBody, ReadWithSkipBody, ReadByIdBody, DeleteByIdBody } = require('./common');
const Joi = require('joi');

const { swagger: createInvoiceSwaggerSchema } = j2s(createInvoiceSchema);
const { swagger: readInvoiceSwaggerSchema } = j2s(readInvoiceSchema);

const createInvoicePeriodSchema = Joi.object({
    year: Joi.string().required(),
    invoiceTrackerId: Joi.number().required()
});

const { swagger: createInvoicePeriodSwaggerSchema } = j2s(createInvoicePeriodSchema);


const invoicePaths =
{
    '/invoices/createPeriod': {
        post: {
            summary: `Creates a new invoice period`,
            tags:  ['Invoice'],
            requestBody: {
                required: false,
                content: {
                    'application/json': {
                        schema: createInvoicePeriodSwaggerSchema,
                    },
                },
            },
            responses: {
                '201': {
                    description: `Invoice created`,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    result: readInvoiceSwaggerSchema
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    message: {
                                        type: 'string',
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'DatabaseError',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    message: {
                                        type: 'string',
                                    }
                                }
                            }
                        }
                    }
                },
            },
        }
    },
    '/invoices/create': {
        ...creationBody(createInvoiceSwaggerSchema, readInvoiceSwaggerSchema, 'invoice', ['Invoice'])
    },
    '/invoices': {
        ...ReadWithSkipBody(readInvoiceSwaggerSchema, 'invoices', ['Invoice'])
    },
    '/invoices/{id}': {
        ...DeleteByIdBody('invoice', ['Invoice']),
        ...ReadByIdBody(readInvoiceSwaggerSchema, 'invoice', ['Invoice'])
    }
};

module.exports = invoicePaths;