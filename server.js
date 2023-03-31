const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const verifyToken = require("./middleware/verifyToken");
const connectDB = require("./config/mongodb");
const app = express();

//Environmental variables config
dotenv.config({ path: "./config/config.env" });

//Connect to the database
connectDB();

//Import routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

//Dev logging
if (process.env.NODE_MODE === "development") {
    app.use(morgan("dev"));
}

//JSON body parser
app.use(express.json());

//Route middleware
app.use("/api/users", authRoutes);
app.use("/api/posts", verifyToken, postRoutes);

//Server listener
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is now listening on port: ${PORT}`.green.bold);
});
