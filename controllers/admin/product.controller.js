const Product = require("../../models/admin/product.model");

const productController = {
  product: async (req, res) => {
    try {
      //create new product
      const newProduct = await new Product({
        productName: req.body.productName,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        thumbnailAfter: req.body.thumbnailAfter,
        size: req.body.size,
        description: req.body.description,
      });
      //save to database
      const product = await newProduct.save();
      return res.status(200).json(product);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const allProduct = await Product.find();
      return res
        .status(200)
        .json({ status: "success", result: allProduct.length, allProduct });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      return res.status(200).json({ status: "success", product });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = productController;
