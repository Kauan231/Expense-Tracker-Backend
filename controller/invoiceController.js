const Controller = require('./controller');
const { InvoiceRepository, InvoiceTrackerRepository } = require('../model/repositories');

class InvoiceController extends Controller {
    constructor() {
        super(new InvoiceRepository());
    }

    async Create(data = {
        date,
        cost,
        status,
        invoiceTrackerId
    }) {
        return await this.repository.Create(data);
    }

    async ReadById(id = 0) {
        return await this.repository.ReadById(id);
    }

    async UpdateInvoice(id, cost, status) {
        return await this.repository.UpdateInvoice(id, {cost, status});
    }

    async CreateAYear(data = {
        year,
        invoiceTrackerId
    }) {
        const { invoiceTrackerId, year } = data;
        const invoiceTrackerRepository = new InvoiceTrackerRepository();
        const invoiceTracker = await invoiceTrackerRepository.ReadById(invoiceTrackerId);
        const dueDate = invoiceTracker.dueDate;
        let invoicesToCreate = [];
        for(let month=1; month < 12; month++) {
            let date = new Date(year, dueDate, month);
            let newInvoice = {
                date: date,
                invoiceTrackerId: invoiceTracker.id
            }

            invoicesToCreate.push(newInvoice);
        }

        return await this.repository.BulkCreate(invoicesToCreate);
    }
}

module.exports = InvoiceController;