const Controller = require('./controller');
const { InvoiceRepository } = require('../model/repositories');

class InvoiceController extends Controller {
    constructor() {
        super(new InvoiceRepository());
    }

    async Create(data = {
        dueDate,
        month,
        year,
        cost,
        status,
        invoiceTrackerId
    }) {
        return await this.repository.Create(data);
    }

    async ReadById(id = 0) {
        return await this.repository.ReadById(id);
    }
}

module.exports = InvoiceController;