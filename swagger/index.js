const invoiceTrackerPaths = require('./invoiceTrackerSchemas');
const invoicePaths = require('./invoiceSchemas');
const documentPaths = require('./documentSchemas');

const swaggerFile = {
    openapi: '3.0.0',
    info: {
        title: 'Expense tracker + Swagger API',
        version: '1.0.0',
    },
    paths: {
        ...invoiceTrackerPaths,
        ...invoicePaths,
        ...documentPaths
    },
};

module.exports = swaggerFile;