const Product = require("../../models/admin/product.model");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const allProduct = await Product.find();
      return res.status(200).render("products", {
        title: "Product",
        listProducts: allProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  homePage: async (req, res) => {
    try {
      const productOverView = await Product.find().limit(14);
      return res.status(200).render("overview", {
        title: "Home",
        products: productOverView,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTopsProduct: async (req, res) => {
    try {
      const topProducts = await Product.find({ productType: "Tops" });
      return res.status(200).render("tops", {
        title: "Tops",
        listTops: topProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBottomProduct: async (req, res) => {
    try {
      const bottomProducts = await Product.find({ productType: "Bottom" });
      return res.status(200).render("bottom", {
        title: "Bottom",
        listBottom: bottomProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOuterwearProduct: async (req, res) => {
    try {
      const outerwearProducts = await Product.find({
        productType: "Outerwear",
      });
      return res.status(200).render("outerwear", {
        title: "Outerwear",
        listOuterwear: outerwearProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const getDetailProduct = await Product.findById(req.params.id);
      const differentProduct = await Product.find({
        productType: getDetailProduct.productType,
      }).limit(10);
      return res.status(200).render("detail", {
        title: getDetailProduct.productName,
        product: getDetailProduct,
        listDiffProduct: differentProduct,
      });
    } catch (error) {
      return res.status(500).render(error);
    }
  },
  login: async (req, res) => {
    try {
      return res.status(200).render("login", {
        title: "Register",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  register: async (req, res) => {
    try {
      return res.status(200).render("register", {
        title: "Login",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
