import express from 'express';

import connectDB from './src/config/db.js';
import 'dotenv/config.js';

import router from './src/routes/index.js';

import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', router);

app.listen(PORT, () => {
  console.log('Server has started at port', PORT);
});

export default app;