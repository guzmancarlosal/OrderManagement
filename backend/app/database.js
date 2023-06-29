import mongoose from 'mongoose';

// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (err) => {
  throw err;
});
