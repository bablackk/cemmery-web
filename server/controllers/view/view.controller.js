const Product = require("../../models/admin/product.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");
const bcrypt = require("bcrypt");

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
      res.status(200).render("login", {
        title: "Login",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  loginHandle: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }); // tìm trong database là có email đó hay không
    if (!user) {
      return res.redirect("/login");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword || !user) {
      return res.redirect("/login");
    } else {
      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      const cookieUserId = res.cookie("user_id", user.id, { signed: true });
      res.redirect(user.admin === true ? "/admin" : "/");
    }
  },
  register: async (req, res) => {
    try {
      return res.status(200).render("register", {
        title: "Register",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  registerHandle: async (req, res, next) => {
    try {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new User
      const newUser = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).redirect("/login");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logoutHandle: (req, res) => {
    res.clearCookie("user_id", { path: "*" });
    req.session.destroy();
    res.redirect("/login");
  },
  cart: async (req, res) => {
    try {
      return res.status(200).render("cart", {
        title: "Cart",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  adminPage: async (req, res) => {
    try {
      return res.status(200).render("admin/home", {
        title: "Admin",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  checkout: async (req, res) => {
    try {
      return res.status(200).render("payment", {
        title: "Payment",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  handleCheckout: async (req, res) => {
    try {
      const newOrder = await new Order({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        productOrder: req.body.productOrder,
        size: req.body.size,
        quantity: req.body.quantity,
        totalMoney: req.body.totalMoney,
      });
      const order = await newOrder.save();
      res.status(200).redirect("/payment/thanks");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  profile: async (req, res) => {
    try {
      res.status(200).render("profile", {
        title: "Profile",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  search: async (req, res) => {
    try {
      const [product] = await Product.find();
      const title = req.query.productName.toLowerCase();
      const productFormatName = product.filter((item) => {
        return item.productName.toLowerCase();
      });
      const findProducts = await productFormatName.find({ productName: title });
      res.render("/search", {
        findProducts,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  thanks: (req, res) => {
    res.status(200).render("thanks", {
      title: "Thanks",
    });
  },
};
