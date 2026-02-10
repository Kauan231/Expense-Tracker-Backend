const Controller = require('./controller');
const { DocumentRepository } = require('../model/repositories');
const InvoiceController = require('./invoiceController');
const { Document } = require('../model/classes');

class DocumentController extends Controller {
    constructor() {
        super(new DocumentRepository());
    }

    async Create(data = {
        documentPath,
        type,
        invoiceId,
        cost
    }) {
        let { documentPath, type, invoiceId, cost } = data;

        if(documentPath) {
            documentPath = documentPath.replace(/^.*uploads\//, 'uploads/');
        }

        let documentToCreate = {};
        for(const key of Object.keys(new Document(data).toObject())) {
            if(![undefined, null, ""].includes(data[key])) {
                documentToCreate[key] = data[key];
            }
        }

        const result = await this.repository.Create(documentToCreate);
        if(![undefined, null, "", NaN].includes(cost)) {
            const invoiceController = new InvoiceController();
            let newStatus;
            if(type === 1 && documentPath) {
                newStatus = 1;
            }
            await invoiceController.UpdateInvoice(invoiceId, cost, newStatus);
        }

        return result;
    }

    async BulkCreate(data = [{
        documentPath,
        type,
        invoiceId
    }]) {
        return await this.repository.BulkCreate(data);
    }

    async ReadById(id = 0) {
        return await this.repository.ReadById(id);
    }

    async ReadByInvoiceAndType(query={invoiceId, type}) {
        const { invoiceId, type } = query;
        return await this.repository.ReadByInvoiceAndType(invoiceId, type);
    }
}

module.exports = DocumentController;