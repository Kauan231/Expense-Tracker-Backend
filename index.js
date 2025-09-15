const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger');
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

/* Middlewares */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(cors());
routes(app);

app.listen(3000, () => {
    console.log('API documentation: http://localhost:3000/docs');
});