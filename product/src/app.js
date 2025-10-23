const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const MessageBroker = require("./utils/messageBroker");
const productsRouter = require("./routes/productRoutes");
require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
    this.setupMessageBroker();
  }

  async connectDB() {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    // ✅ Route kiểm tra service có chạy không
    this.app.get("/", (req, res) => res.send("✅ Product Service is running!"));

    // ✅ Routes chính cho sản phẩm
    this.app.use("/api/products", productsRouter);
  }

  setupMessageBroker() {
    MessageBroker.connect();
  }

  start() {
    const PORT = process.env.PORT || 3002;
    // ✅ Gán server vào this.server để tránh lỗi khi stop()
    this.server = this.app.listen(PORT, () =>
      console.log(`Product service started on port ${PORT}`)
    );
  }

  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}

module.exports = App;
