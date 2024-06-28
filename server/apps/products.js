import { Router } from "express";

import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");

  const products = await collection.find().toArray();

  return res.json({ data: products });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");

  const productsData = { ...req.body };

  await collection.insertOne(productsData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:productId", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.productId);

  const productsData = { ...req.body };

  await collection.updateOne(
    {
      _id: productId,
    },
    { $set: productsData }
  );

  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:productId", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.productId);

  await collection.deleteOne({
    _id: productId,
  });

  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
