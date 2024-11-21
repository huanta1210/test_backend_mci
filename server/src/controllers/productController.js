import Product from '../models/productModel';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.status(404).json('No products found');
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json('Error fetching products');
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json('No product found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json('Error fetching product');
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json('Invalid product data');
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true
    });
    console.log(product);
    if (!product) {
      return res.status(404).json('No product found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json('Invalid product data');
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json('No product found');
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json('Error deleting product');
  }
};
