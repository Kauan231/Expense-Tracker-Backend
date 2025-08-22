const Controller = require('./controller');
const { DocumentRepository } = require('../model/repositories');

class DocumentController extends Controller {
    constructor() {
        super(new DocumentRepository());
    }

    async Create(data = {
        documentPath,
        type,
        invoiceId
    }) {
        return await this.repository.Create(data);
    }

    async ReadById(id = 0) {
        return await this.repository.ReadById(id);
    }
}

module.exports = DocumentController;