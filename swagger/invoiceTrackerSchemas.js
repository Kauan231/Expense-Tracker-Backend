const j2s = require('joi-to-swagger');
const { createInvoiceTrackerSchema } = require('../model/dtos/createInvoiceTrackerDto');
const readInvoiceTrackerSchema = require('../model/dtos/readInvoiceTrackerDto');
const { creationBody, ReadWithSkipBody, ReadByIdBody, DeleteByIdBody } = require('./common');

const { swagger: createInvoiceTrackerSwaggerSchema } = j2s(createInvoiceTrackerSchema);
const { swagger: readInvoiceTrackerSwaggerSchema } = j2s(readInvoiceTrackerSchema);

const invoiceTrackerPaths =
{
    '/invoiceTrackers/create': {
        ...creationBody(createInvoiceTrackerSwaggerSchema, readInvoiceTrackerSwaggerSchema, 'invoiceTracker', ['InvoiceTracker'])
    },
    '/invoiceTrackers': {
        ...ReadWithSkipBody(readInvoiceTrackerSwaggerSchema, 'invoiceTrackers', ['InvoiceTracker'])
    },
    '/invoiceTrackers/{id}': {
        ...DeleteByIdBody('invoiceTracker', ['InvoiceTracker']),
        ...ReadByIdBody(readInvoiceTrackerSwaggerSchema, 'invoiceTracker', ['InvoiceTracker'])
    }
};

module.exports = invoiceTrackerPaths;