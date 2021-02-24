import express from 'express';
import 'dotenv/config.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger.json";
import router from './src/routes/index.js';

import connectDB from './src/config/db.js';


import bodyParser from 'body-parser';

const app = express();
connectDB()

const PORT = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/todo', router);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log('Server has started at port', PORT);
});

export default app;