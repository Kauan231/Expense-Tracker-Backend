const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger');
const routes = require('./routes');
const path = require('path');
const db = require('./models');

const app = express();

/* Middlewares */
if(process.env.DEV) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
app.use(express.json());
app.use(cors());

/* Uploads */
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

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
  } catch (err) {
    console.error('Bootstrap failed:', err);
    process.exit(1);
  }
}

bootstrap();
