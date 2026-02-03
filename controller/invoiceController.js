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
        year
    }) {
        const { year } = data;

        const invoiceTrackerRepository = new InvoiceTrackerRepository();
        let allInvoiceTrackers = await invoiceTrackerRepository.ReadAllWithSkipLimit(0, 1000);
        for (let invoiceTracker of allInvoiceTrackers) {
            let dueDate = invoiceTracker.dueDate;

            if(dueDate == 0) {
                dueDate = 1;
            }

            let invoicesToCreate = [];
            for(let month=0; month < 12; month++) {
                let date = new Date(year, month, dueDate);
                let newInvoice = {
                    date: date,
                    invoiceTrackerId: invoiceTracker.id,
                    status: 0
                }

                invoicesToCreate.push(newInvoice);
            }

            await this.repository.BulkCreate(invoicesToCreate);
        }
    }

    async ReadAllWithSkipLimit(data = { skip, limit, year, month }) {
        return await this.repository.ReadAllWithSkipLimit(data);
    }
}

module.exports = InvoiceController;