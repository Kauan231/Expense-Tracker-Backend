const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger');
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

/* Middlewares */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(cors());

// Serve static files from /project/uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

routes(app);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`LAN: http://0.0.0.0:${PORT}`));