import categoryModel from "../models/category.model.js";

export const getCategorys = async (req, res) => {
  const categorys = await categoryModel.find();
  res.json(categorys);
};

export const createCategory = async (req, res) => {
  const { category } = req.body;

  const newCategory = new categoryModel({
    category,
  });

  const saveCategory = await newCategory.save();

  res.json(saveCategory);
};

export const deleteCategory = async (req, res) => {
  const category = await categoryModel.findByIdAndDelete(req.params.id);
  if (!category)
    return res.status(404).json({ message: "Categoria no encontrada" });
  res.json(category);
};

export const updataCategory = async (req, res) => {
  try { 
    const { category } = req.body;
    const categor = await categoryModel.findById(req.params.id);

    if (!categor){ 
    return res.status(404).json({ message: "categoria no encontrada" });
    }
    category.category = category;
    const updateCategory = await category.save();
    res.json(updateCategory);
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar la categoria"})
  }
};
