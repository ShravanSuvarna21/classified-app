import { validationResult } from "express-validator";
import Product from "../models/product-model.js";
import Category from "../models/category-model.js";
import { response } from "express";
const productControl = {};

productControl.create = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }
  const { name, price, description, category } = req.body;
  try {
    const product = new Product({ name, price, description });
    product.seller = req.userId;
    product.isApproved = false;
    const categoryCheck = await Category.findById(category);
    if (!categoryCheck) {
      return res.status(404).json({ Error: "Category not found" });
    }
    product.category = categoryCheck;
    product.save();
    res.json({
      Notice: "Product request has been sent to the Admin for the approval",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something Went Wrong" });
  }
};

productControl.listProduct = async (req, res) => {
  try {
    const product = await Product.find().select("name price description");
    if (!product) {
      res.status(404).json({ Notice: "No product found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

productControl.productUpdate = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }
  const id = req.params.id;
  const body = req.body;
  try {
    let product;
    if (req.role == "admin") {
      product = await Product.findByIdAndUpdate(id, body, { new: true });
    } else {
      product = await Product.findOneAndUpdate(
        { _id: id, seller: req.userId },
        body,
        { new: true }
      );
    }
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ Error: "Product not found/ not authorized" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

productControl.productDelete = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }
  const id = req.params.id;
  try {
    let product;
    if (req.role == "admin") {
      product = await Product.findByIdAndDelete(id);
    } else {
      product = await Product.findOneAndDelete({ _id: id, seller: req.userId });
    }
    if (!product) {
      return res
        .status(404)
        .json({ Error: "product not found/Not authorized" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

productControl.productApprove = async (req, res) => {
  const id = req.params.id;
  const { isApproved } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );
    res.json([{ Notice: "Prodcut listing has beeen Approved", product }]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

productControl.enquries = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ error: error.array() });
  }
  try {
    let product;
    const productID = req.params.id;
    if (req.role == "buyer") {
      const buyerId = req.userId;
      const { message } = req.body;
      // const response = ""
      product = await Product.findByIdAndUpdate(
        productID,
        {
          $push: { enquires: { message, buyer: buyerId, response: "" } },
          $inc: { views: 1 },
        },
        { new: true }
      );
      console.log("buyer Executed");
    }
    if (req.role == "seller") {
      const { response, buyerId } = req.body;
      console.log("seller executed");
      product = await Product.findOneAndUpdate(
        { _id: productID, "enquires.buyer": buyerId },
        { $set: { "enquires.$.response": response } },
        { new: true }
      );
    }
    if (!product) {
      res.status(404).json({ error: "product is not listed" });
    }
    res.status(200).json({ Notice: "Enquiry sent to the Seller", product });
  } catch (error) {
    res.status(500).json({ errors: "Something went wrong" });
  }
};

export default productControl;
