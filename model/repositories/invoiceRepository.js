const Repository = require('./repository');
const { Invoice } = require('../classes');

class InvoiceRepository extends Repository {
    constructor() {
        super('Invoice');
    }

    async Create(data = {
        date,
        cost,
        status,
        invoiceTrackerId
    }) {
        const result = await super.Create(data);
        return new Invoice(result);
    }

    async BulkCreate(data = [{
        date,
        cost,
        status,
        invoiceTrackerId
     }]) {
        const results = await super.BulkCreate(data);
        if (results == undefined) { return []; }
        return results.map(result => new Invoice(result));
    }

    async ReadById(id = 0) {
        const result = await super.ReadById(id);
        if (result == undefined) { return undefined; }
        return new Invoice(result);
    }

    async ReadAllWithSkipLimit(data = { skip, limit, year, month }) {
        const results = await super.ReadAllWithSkipLimit(Number(data.skip), Number(data.limit), Number(data.year), Number(data.month) );
        if (results?.length == 0 || results?.length == undefined) { return []; }
        return results.map(result => new Invoice(result));
    }

    async UpdateInvoice(id, fields) {
        let invoice = await super.ReadByIdRaw(id);
        for(let field of Object.keys(fields)) {
            invoice[field] = fields[field];
        }
        return await invoice.save();
    }

    async DeleteAllInvoicesOfAPeriod(year) {
        await super.DeleteByYear(year, "date");
    }
}

module.exports = InvoiceRepository;