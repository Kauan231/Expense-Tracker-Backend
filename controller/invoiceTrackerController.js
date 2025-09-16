const Controller = require('./controller');
const { InvoiceTrackerRepository } = require('../model/repositories');

class InvoiceTrackerController extends Controller {
    constructor() {
        super(new InvoiceTrackerRepository());
    }

    async Create(data = { name: '', dueDate: 1}) {
        return await this.repository.Create(data);
    }

    async BulkCreate(data = [{ name: '', dueDate: 1}]) {
        return await this.repository.BulkCreate(data);
    }

    async ReadById(id = 0, year, month) {
        if (year) {
            return await this.repository.ReadByIdAndNestedPopulateFromADate(id, [
                { model: 'Invoice', include: ['Document'], year, month } // now handled properly
            ]);
        }

        return await this.repository.ReadByIdAndNestedPopulate(id, [
            { model: 'Invoice', include: ['Document'] }
        ]);
    }
}

module.exports = InvoiceTrackerController;