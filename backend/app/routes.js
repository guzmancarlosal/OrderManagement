/* eslint-disable quotes */
import { Router } from 'express';
import OrderController from './controllers/orders.controller';
import errorHandler from './middleware/error-handler';
import multer from 'multer';
import path from 'path';

const routes = new Router();
const storage = multer.diskStorage({
  // Destination to store image
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const upload = multer({ storage });

routes.post('/create', upload.single('csv'), OrderController.create);

routes.use(errorHandler);

export default routes;
