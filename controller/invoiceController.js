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
        //const invoiceRepository = new InvoiceRepository();
        //await invoiceRepository.DeleteAllInvoicesOfAPeriod(year);

        const invoiceTrackerRepository = new InvoiceTrackerRepository();
        const invoiceTracker = await invoiceTrackerRepository.ReadById(invoiceTrackerId);
        let dueDate = invoiceTracker.dueDate;
        if(dueDate == 0) {
            dueDate = 1;
        }
        let invoicesToCreate = [];
        for(let month=0; month < 11; month++) {
            let date = new Date(year, month, dueDate);
            let newInvoice = {
                date: date,
                invoiceTrackerId: invoiceTracker.id,
                status: 0
            }

            invoicesToCreate.push(newInvoice);
        }

        return await this.repository.BulkCreate(invoicesToCreate);
    }

    async ReadAllWithSkipLimit(data = { skip, limit, year, month }) {
        return await this.repository.ReadAllWithSkipLimit(data);
    }
}

module.exports = InvoiceController;