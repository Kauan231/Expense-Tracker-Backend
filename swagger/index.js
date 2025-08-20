const invoiceTrackerPaths = require('./invoiceTrackerSchemas');

const swaggerFile = {
    openapi: '3.0.0',
    info: {
        title: 'Expense tracker + Swagger API',
        version: '1.0.0',
    },
    paths: {
        ...invoiceTrackerPaths
    },
};

module.exports = swaggerFile;