const product = require("../../models/admin/product.model");

module.exports = {
  getAllProducts: async (req, res) => {
    const allProduct = await product.find();
    return res.status(200).render("product", {
      title: "Product",
      product: allProduct,
    });
  },
  homePage: async (req, res) => {
    return res.status(200).render("overview", {
      title: "Home",
    });
  },
};
