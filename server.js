const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

mongoose.connect("mongodb+srv://Foodiehub:dharun16122006@cluster0.pjmmz1c.mongodb.net/FoodProject?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));
const cartSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Cart = mongoose.model("Cart", cartSchema);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Backend Running 🚀");
});
const foods = [
  {
    id: 1,
    name: "Burger",
    price: 199
  },
  {
    id: 2,
    name: "Pizza",
    price: 299
  },
  {
    id: 3,
    name: "Chicken",
    price: 249
  }
];
let cart=[];
app.get("/foods", (req, res) => {
  res.json(foods);
});
app.post("/cart", async (req, res) => {

   const item = req.body;

   await Cart.create(item);

   res.json({
      message: "Item Added To Cart"
   });

});
app.delete("/clear-cart", async (req, res) => {

    console.log("CLEAR CART API CALLED");

    await Cart.deleteMany({});

    res.json({
        message: "Cart Cleared"
    });

});
app.get("/cart", async (req, res) => {
  const items = await Cart.find();
   res.json(items);
});
app.delete("/cart/:id", async (req, res) => {

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
        message: "Item Deleted"
    });

});
app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});