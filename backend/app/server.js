import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
require('dotenv').config();
import morgan from 'morgan';

import routes from './routes';

const app = express();

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));
app.use(morgan('dev'));

// Mount API routes
app.use('/api/v1/', routes);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Server is running on port:${process.env.PORT}
  `);
});

export default app;
