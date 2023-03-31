const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`Connected to database: ${conn.connection.host}`.yellow.bold);
};

module.exports = connectDB;
