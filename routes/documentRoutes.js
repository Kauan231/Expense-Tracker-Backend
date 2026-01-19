const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const { DocumentController } = require('../controller');
const { CreateDocumentDto, EmptyDocumentDto } = require('../model/dtos/createDocumentDto');
const CommonRoutes = require('./routes');
const multer  = require('multer');

const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const router = Router();

// configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// init multer
const upload = multer({ storage: storage });

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

const documentRouter = new DocumentRouter();

router.post('/create', upload.single('file'), async (req, res) => {
  console.log(req.file); // uploaded file info
  let parsedBody = JSON.parse(JSON.stringify(req.body));
  parsedBody.documentPath = req.file.path;

  parsedBody.type = Number(parsedBody.type);
  parsedBody.invoiceId = Number(parsedBody.invoiceId);
  parsedBody.cost = Number(parsedBody.cost);
  await documentRouter.Create({body: parsedBody}, res);
});
router.get('/:id', async (req, res) => await documentRouter.ReadById(req, res));
router.get('/', async (req, res) => await documentRouter.Get(req, res));
router.delete('/:id', async (req, res) => await documentRouter.Delete(req, res));
module.exports = router;