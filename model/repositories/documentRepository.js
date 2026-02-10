const Repository = require('./repository');
const { Document } = require('../classes');

class DocumentRepository extends Repository {
    constructor() {
        super('Document');
    }

    async Create(data = {
        documentPath,
        type,
        invoiceId,
    }) {
        let result = await this.ReadByInvoiceAndTypeRaw(data);

        if(!result) {
            result = await super.Create(data);
        } else {
            const document = new Document(result).toObject();
            const keysToUpdate = Object.keys(document);

            const updateObject = {};
            for(const key of keysToUpdate) {
                if(data[key] != document[key]) {
                    updateObject[key] = data[key];
                }
            }

            result = await super.UpdateById(result.id, updateObject);
        }
        return new Document(result);
    }

    async BulkCreate(data = [{
        documentPath,
        type,
        invoiceId,
     }]) {
        const results = await super.BulkCreate(data);
        if (results == undefined) { return []; }
        return results.map(result => new Document(result));
    }

    async ReadById(id = 0) {
        const result = await super.ReadById(id);
        if (result == undefined) { return undefined; }
        return new Document(result);
    }

    async ReadAllWithSkipLimit(data = { skip, limit }) {
        const results = await super.ReadAllWithSkipLimit(data.skip, data.limit);
        if (results?.length == 0 || results?.length == undefined) { return []; }
        return results.map(result => new Document(result));
    }

    async ReadByInvoiceAndTypeRaw(data = {invoiceId, type}) {
        const {invoiceId, type} = data;
        const result = await super.ReadOneByCustomField({invoiceId, type});
        if (result == undefined) { return undefined; }
        return result;
    }
}

module.exports = DocumentRepository;