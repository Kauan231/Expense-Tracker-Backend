const Controller = require('./controller');
const { DocumentRepository } = require('../model/repositories');
const InvoiceController = require('./invoiceController');

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
        let result = await this.repository.Create({documentPath, type, invoiceId});

        if(type == 0 || ![undefined, null, ""].includes(cost)) {
            const invoiceController = new InvoiceController();
            let newStatus;
            if(type === 0) {
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
}

module.exports = DocumentController;