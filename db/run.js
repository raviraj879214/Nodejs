const connectDB = require('./db');
const User = require('./models/User');

const run = async () => {
  await connectDB();

  // This ensures the collection is created based on the model
  await User.createCollection();

  console.log('User collection created');
};

run();
