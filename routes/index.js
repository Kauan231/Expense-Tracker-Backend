const invoiceTrackerRoutes = require('./invoiceTrackerRoutes');

module.exports = (app) => {
    app.use('/invoiceTrackers', invoiceTrackerRoutes);
};