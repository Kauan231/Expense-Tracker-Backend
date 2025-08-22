const j2s = require('joi-to-swagger');
const { createInvoiceSchema } = require('../model/dtos/createInvoiceDto');
const readInvoiceSchema = require('../model/dtos/readInvoiceDto');
const { creationBody, ReadWithSkipBody, ReadByIdBody, DeleteByIdBody } = require('./common');

const { swagger: createInvoiceSwaggerSchema } = j2s(createInvoiceSchema);
const { swagger: readInvoiceSwaggerSchema } = j2s(readInvoiceSchema);

const invoicePaths =
{
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