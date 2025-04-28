import Category from "../models/category-model.js";
import { validationResult } from "express-validator";
import Product from "../models/product-model.js";
const categoryControl = {};

categoryControl.register = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }

  const body = req.body;
  try {
    const checkCategory = await Category.findOne({ name: body.name });
    if (checkCategory) {
      return res.status(400).json({ Error: "Category already exists" });
    } else {
      const category = await Category.create(body);
      return res.status(201).json(category);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

categoryControl.listCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
 
  }
};

categoryControl.Update = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }
  const categoryId = req.params.id;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name: name },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .json({ Error: "category not found for provided Id" });
    }
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

categoryControl.Delete = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ Error: error.array() });
  }
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    const category = await Category.findByIdAndDelete(id); //not working
    res.json([category, product]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Something went wrong" });
  }
};

export default categoryControl;
