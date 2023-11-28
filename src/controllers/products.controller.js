import productModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await productModel.find();
  res.json(products);
};


export const createProduct = async (req, res) => {
  const { name, price, description, stock, active } = req.body;

  const newProduct = new productModel({
    name,
    price,
    description,
    stock,
    active,
  });

  const saveProduct = await newProduct.save();

  res.json(saveProduct);
};


export const getProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: " producto no encontrado" });

  res.json(product);
};


export const deleteProduct = async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);

  if (!product)
    return res.status(404).json({ message: "producto no encontrado" });

  res.json(product);
};


export const updateProduct = async (req, res) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!product)
    return res.status(404).json({ message: "producto no encontrado" });

  res.json(product);
};
