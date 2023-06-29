import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required.'],
    },
    vender: {
      type: String,
      required: [true, 'Vender is required.'],
    },
    csv: {
      type: String,
      required: [true, 'CSV is required.'],
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
