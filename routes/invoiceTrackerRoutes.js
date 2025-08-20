const { Router } = require('express');
const { InvoiceTrackerController } = require('../controller');
const { CreateInvoiceTrackerDto, EmptyInvoiceTrackerDto } = require('../model/dtos/createInvoiceTrackerDto');
const CommonRoutes = require('./routes');

const router = Router();

class InvoiceTrackerRouter extends CommonRoutes {
    constructor() {
        super(new InvoiceTrackerController());
        this.emptyStateDto = EmptyInvoiceTrackerDto;
        this.createDto = CreateInvoiceTrackerDto;
    }
    async Get(req, res) { await super.Get(req, res); }
    async Create(req, res) { await super.Create(req, res); }
    async ReadById(req, res) { await super.ReadById(req, res); }
    async Delete(req, res) { await super.Delete(req, res); }
}

const invoiceTrackerRouter = new InvoiceTrackerRouter();

router.post('/create', async (req, res) => await invoiceTrackerRouter.Create(req, res));
router.get('/:id', async (req, res) => await invoiceTrackerRouter.ReadById(req, res));
router.get('/', async (req, res) => await invoiceTrackerRouter.Get(req, res));
router.delete('/:id', async (req, res) => await invoiceTrackerRouter.Delete(req, res));

module.exports = router;