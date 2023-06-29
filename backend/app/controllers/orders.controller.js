import { deleteCSV, validateCSV } from '../lib/util';
import Order from '../models/order';

class OrderController {
  create = async (req, res, next) => {
    const { date, vender } = req.body;
    const csv = req.file.path;
    const order = new Order({
      date,
      vender,
      csv,
    });
    const { valid, errors } = await validateCSV(csv);

    try {
      if (valid) {
        await order.save();
      } else {
        await deleteCSV(csv);
      }
      res.status(200).json({ success: valid, errors });
    } catch (err) {
      next(err);
    }
  };
}

export default new OrderController();
