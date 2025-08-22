const { Router } = require('express');
const { DocumentController } = require('../controller');
const { CreateDocumentDto, EmptyDocumentDto } = require('../model/dtos/createDocumentDto');
const CommonRoutes = require('./routes');

const router = Router();

class DocumentRouter extends CommonRoutes {
    constructor() {
        super(new DocumentController());
        this.emptyStateDto = EmptyDocumentDto;
        this.createDto = CreateDocumentDto;
    }
    async Get(req, res) { await super.Get(req, res); }
    async Create(req, res) { await super.Create(req, res); }
    async ReadById(req, res) { await super.ReadById(req, res); }
    async Delete(req, res) { await super.Delete(req, res); }
}

const invoiceRouter = new DocumentRouter();

router.post('/create', async (req, res) => await invoiceRouter.Create(req, res));
router.get('/:id', async (req, res) => await invoiceRouter.ReadById(req, res));
router.get('/', async (req, res) => await invoiceRouter.Get(req, res));
router.delete('/:id', async (req, res) => await invoiceRouter.Delete(req, res));

module.exports = router;