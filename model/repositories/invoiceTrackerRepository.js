const Repository = require('./repository');
const { InvoiceTracker } = require('../classes');

class InvoiceTrackerRepository extends Repository {
    constructor() {
        super('InvoiceTracker');
    }

    async Create(data = { name: '', dueDate }) {
        const result = await super.Create(data);
        return new InvoiceTracker(result);
    }

    async BulkCreate(data = [{ name: '' }]) {
        const results = await super.BulkCreate(data);
        if (results == undefined) { return []; }
        return results.map(result => new InvoiceTracker(result));
    }

    async ReadById(id = 0) {
        const result = await super.ReadById(id);
        if (result == undefined) { return undefined; }
        return new InvoiceTracker(result);
    }

    async ReadAllWithSkipLimit(data = { skip, limit }) {
        const results = await super.ReadAllWithSkipLimit(data.skip, data.limit);
        if (results?.length == 0 || results?.length == undefined) { return []; }
        return results.map(result => new InvoiceTracker(result));
    }
}

module.exports = InvoiceTrackerRepository;