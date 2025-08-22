const j2s = require('joi-to-swagger');
const { createDocumentSchema } = require('../model/dtos/createDocumentDto');
const readDocumentSchema = require('../model/dtos/readDocumentDto');
const { creationBody, ReadWithSkipBody, ReadByIdBody, DeleteByIdBody } = require('./common');

const { swagger: createDocumentSwaggerSchema } = j2s(createDocumentSchema);
const { swagger: readDocumentSwaggerSchema } = j2s(readDocumentSchema);

const documentPaths =
{
    '/documents/create': {
        ...creationBody(createDocumentSwaggerSchema, readDocumentSwaggerSchema, 'document', ['Document'])
    },
    '/documents': {
        ...ReadWithSkipBody(readDocumentSwaggerSchema, 'documents', ['Document'])
    },
    '/documents/{id}': {
        ...DeleteByIdBody('document', ['Document']),
        ...ReadByIdBody(readDocumentSwaggerSchema, 'document', ['Document'])
    }
};

module.exports = documentPaths;