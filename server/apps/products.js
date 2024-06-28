import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();
  return res.json({
    data: products,
  });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  const products = await collection.findOne({
    _id: productId,
  });
  return res.json({
    data: products,
  });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const newProduct = { ...req.body };
  await collection.insertOne(newProduct);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  const updatedProduct = { ...req.body };
  await collection.updateOne(
    {
      _id: productId,
    },
    { $set: updatedProduct }
  );

  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  await collection.deleteOne({
    _id: productId,
  });
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
