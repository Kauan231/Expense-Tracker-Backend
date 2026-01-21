const j2s = require('joi-to-swagger');
const readDocumentSchema = require('../model/dtos/readDocumentDto');
const { ReadWithSkipBody, ReadByIdBody, DeleteByIdBody } = require('./common');

const { swagger: readDocumentSwaggerSchema } = j2s(readDocumentSchema);

const documentPaths =
{
    '/documents/create': {
        post: {
            summary: `Uploads a document`,
            tags: ['Document'],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                    schema: {
                        type: 'object',
                        properties: {
                            file: {
                                type: 'string',
                                format: 'binary',
                                description: 'The file to upload'
                            },
                            type: { type: 'number', format: 'float' },
                            invoiceId: { type: 'number', format: 'float' },
                            cost: { type: 'number', format: 'float' },
                        },
                        required: ['file', 'type', 'invoiceId'],
                        additionalProperties: false
                    }
                    }
                }
            },
            responses: {
            '201': {
                description: `File uploaded successfully`,
                content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            type: { type: 'string' },
                            result: readDocumentSwaggerSchema
                        },
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
                        type: { type: 'string' },
                        message: { type: 'string' }
                    }
                    }
                }
                }
            },
            '500': {
                description: 'Database error',
                content: {
                'application/json': {
                    schema: {
                    type: 'object',
                    properties: {
                        type: { type: 'string' },
                        message: { type: 'string' }
                    }
                    }
                }
                }
            }
            }
        }
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