module.exports = {
  getAllProducts: async (req, res) => {
    return res.status(300).render("product", {
      title: "Product",
    });
  },
  homePage: async (req, res) => {
    return res.status(200).render("overview", {
      title: "Home",
    });
  },
};
