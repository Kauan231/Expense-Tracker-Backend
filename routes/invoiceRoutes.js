const { Router } = require('express');
const { InvoiceController } = require('../controller');
const { CreateInvoiceDto, EmptyInvoiceDto } = require('../model/dtos/createInvoiceDto');
const CommonRoutes = require('./routes');

const router = Router();

class InvoiceRouter extends CommonRoutes {
    constructor() {
        super(new InvoiceController());
        this.emptyStateDto = EmptyInvoiceDto;
        this.createDto = CreateInvoiceDto;
    }
    async Get(req, res) { await super.Get(req, res); }
    async Create(req, res) { await super.Create(req, res); }
    async ReadById(req, res) { await super.ReadById(req, res); }
    async Delete(req, res) { await super.Delete(req, res); }
}

const invoiceRouter = new InvoiceRouter();

router.post('/create', async (req, res) => await invoiceRouter.Create(req, res));
router.get('/:id', async (req, res) => await invoiceRouter.ReadById(req, res));
router.get('/', async (req, res) => await invoiceRouter.Get(req, res));
router.delete('/:id', async (req, res) => await invoiceRouter.Delete(req, res));

module.exports = router;