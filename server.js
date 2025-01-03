import express from "express";
import mongoose from "mongoose";
import { userRoute } from "./Routes/user.routes.js";
import { productRoute } from "./Routes/product.routes.js";
import { cartRoutes } from "./Routes/cart.routes.js";

const app = new express();
const port = 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoppyglobe_db')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes Calling
productRoute(app);
cartRoutes(app);
userRoute(app);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})