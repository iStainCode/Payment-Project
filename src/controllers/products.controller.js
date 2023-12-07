import productModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await productModel.find();
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      stock,
      category,
      active,
      image1,
      image2
    } = req.body;

    const newProduct = new productModel({
      name,
      price,
      description,
      stock,
      category,
      active,
      image1,
      image2
    });

    const saveProduct = await newProduct.save();

    res.json(saveProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto Xd back", error });
  }
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
  try {
    const { name, price, description, stock, category, active } = req.body;

    // Encuentra el producto existente por su ID
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualiza los campos del producto
    product.name = name;
    product.price = price;
    product.description = description;
    product.stock = stock;
    product.category = category;
    product.active = active;

    // Verifica si hay nuevas imágenes y las actualiza si es necesario
    if (req.files["image1"]) {
      product.image1 = req.files["image1"][0].path; // Actualiza la primera imagen
    }

    if (req.files["image2"]) {
      product.image2 = req.files["image2"][0].path; // Actualiza la segunda imagen
    }

    // Guarda el producto actualizado en la base de datos
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};
