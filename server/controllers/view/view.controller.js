const product = require("../../models/admin/product.model");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const allProduct = await product.find();
      return res.status(200).render("products", {
        title: "Product",
        product: allProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  homePage: async (req, res) => {
    try {
      return res.status(200).render("overview", {
        title: "Home",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTopsProduct: async (req, res) => {
    try {
      const topProducts = await product.find({ productType: "Tops" });
      return res.status(200).render("product-tops", {
        title: "Tops",
        tops: topProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBottomProduct: async (req, res) => {
    try {
      const bottomProducts = await product.find({ productType: "Bottom" });
      return res.status(200).render("product-bottom", {
        title: "Bottom",
        bottom: bottomProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOuterwearProduct: async (req, res) => {
    try {
      const outerwearProducts = await product.find({
        productType: "Outerwear",
      });
      return res.status(200).render("product-outerwear", {
        title: "Outerwear",
        outerwear: outerwearProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
