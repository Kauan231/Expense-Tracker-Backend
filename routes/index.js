const invoiceTrackerRoutes = require('./invoiceTrackerRoutes');
const invoiceRoutes = require('./invoiceRoutes');
const documentRoutes = require('./documentRoutes');

module.exports = (app) => {
    app.use('/invoiceTrackers', invoiceTrackerRoutes);
    app.use('/invoices', invoiceRoutes);
    app.use('/documents', documentRoutes);
};