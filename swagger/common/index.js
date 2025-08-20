const errorBody = {
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
};

const creationBody = (createSchema, readSchema, className, tags) => {
    return {
        post: {
            summary: `Creates a new ${className}`,
            tags: tags,
            requestBody: {
                required: false,
                content: {
                    'application/json': {
                        schema: createSchema,
                    },
                },
            },
            responses: {
                '201': {
                    description: `${className} created`,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    result: readSchema
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: errorBody
                },
                '500': {
                    description: 'DatabaseError',
                    content: errorBody
                },
            },
        }
    };
};

const ReadWithSkipBody = (readSchema, classNameInPlural, tags) => {
    return {
        get: {
            summary: `Read all ${classNameInPlural}`,
            tags: tags,
            parameters: [
                {
                    in: 'query',
                    name: 'skip',
                    schema: {
                        type: 'integer',
                    },
                    required: true,
                    description: 'Number of items to skip',
                },
                {
                    in: 'query',
                    name: 'limit',
                    schema: {
                        type: 'integer',
                    },
                    required: true,
                    description: 'Maximum number of items to return',
                }
            ],
            responses: {
                '200': {
                    description: 'Search result',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    result: {
                                        type: 'array',
                                        items: readSchema
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: errorBody
                },
                '500': {
                    description: 'Database error',
                    content: errorBody
                },
            },
        }
    };
};

const ReadByIdBody = (readSchema, className, tags) => {
    return {
        get: {
            summary: `Search ${className} by Id`,
            tags: tags,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'integer',
                    },
                    required: true,
                    description: 'Id to search',
                }
            ],
            responses: {
                '201': {
                    description: 'Search Result',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    result: readSchema
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: errorBody
                },
                '500': {
                    description: 'DatabaseError',
                    content: errorBody
                },
            },
        }
    };
};

const ReadManyById = (readSchema, classNameInPlural, tags) => {
    return {
        get: {
            summary: `Read all ${classNameInPlural} by custom field`,
            tags: tags,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'integer',
                    },
                    required: true,
                    description: 'Id to search',
                }
            ],
            responses: {
                '200': {
                    description: 'Search result',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    },
                                    result: {
                                        type: 'array',
                                        items: readSchema
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: errorBody
                },
                '500': {
                    description: 'Database error',
                    content: errorBody
                },
            },
        }
    };
};

const DeleteByIdBody = (className, tags) => {
    return {
        delete: {
            summary: `Delete ${className} by Id`,
            tags: tags,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'integer',
                    },
                    required: true,
                    description: 'Id to search',
                }
            ],
            responses: {
                '202': {
                    description: 'Delete Result',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Validation error',
                    content: errorBody
                },
                '500': {
                    description: 'DatabaseError',
                    content: errorBody
                },
            },
        }
    };
};


module.exports = {
    errorBody,
    creationBody,
    ReadWithSkipBody,
    ReadByIdBody,
    ReadManyById,
    DeleteByIdBody
};