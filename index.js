const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger');
const routes = require('./routes');
const path = require('path');
const db = require('./models');
const app = express();
const { InvoiceTrackerController } = require('./controller');
/* Middlewares */
if(process.env.DEV) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
app.use(express.json());
app.use(cors());

/* Uploads */
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

async function getPendingInvoices () {
  let invoiceTrackerController = new InvoiceTrackerController();
  let allInvoiceTrackers;
  try { allInvoiceTrackers = await invoiceTrackerController.ReadAllWithSkipLimit(0, 1000);
  } catch(err) { return console.error('Failed to get pending invoices', err); }

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const monthName = new Date(year, month - 1).toLocaleString("pt-Br", { month: "long" }).toLocaleUpperCase();
  const today = new Date().getDate();

  let pendingMessages = [];
  let expiredMessages = [];
  let allInvoiceTrackerIds = allInvoiceTrackers.map(tracker => tracker.id);
  for (let id of allInvoiceTrackerIds) {
    let tracker = await invoiceTrackerController.ReadById(id, year, month);

    const invoices = tracker.Invoices ?? [];
    const dueDate = tracker.dueDate;

    const invoiceForMonth = invoices.find(inv => {
      const invDate = new Date(inv.date);
      return invDate.getFullYear() === year && (invDate.getMonth() + 1) === month;
    });

    if (invoiceForMonth?.status != 1) {
      if (today > dueDate) {
        pendingMessages.push(
          `❗ "${tracker.name}" → Nenhum comprovante enviado para o período ${monthName} ${year}. A fatura venceu em ${dueDate}.`
        );
      } else {
        expiredMessages.push(
          `⚠️ "${tracker.name}" → Nenhum comprovante enviado para o período ${monthName} ${year}. A data de vencimento é ${dueDate}.`
        );
      }
    }
  }

  for(let message of pendingMessages) {
    notify("Fatura pendente", message)
  }

  for(let message of expiredMessages) {
    notify("Fatura vencida", message)
  }
}

function notify(title, body) {
  if (process.send) {
    process.send({
      type: "notify",
      payload: { title, body }
    });
  }
}

async function bootstrap() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');

    await db.sequelize.sync();
    console.log('Database synced');

    routes(app);

    const PORT = process.env.BACKEND_PORT || 3000;
    const IP = process.env.DEV ? '0.0.0.0' : '127.0.0.1';
    app.listen(PORT, IP, () => {
      console.log(`LAN: http://${IP}:${PORT}`);
      console.log(`Docs: http://${IP}:${PORT}/docs`);
    });

    await getPendingInvoices();
  } catch (err) {
    console.error('Bootstrap failed:', err);
    process.exit(1);
  }
}

bootstrap();
