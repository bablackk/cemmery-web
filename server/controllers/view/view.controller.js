const Product = require("../../models/admin/product.model");
const User = require("../../models/user.model");
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
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword && !user) {
      return res.redirect("/login").end;
    } else {
      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      const cookieUserId = res.cookie("user_id", user.id, { signed: true });
      console.log(cookieUserId);
      return res.redirect(user.admin === true ? "/admin" : "/");
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
      return res.status(200).render("admin_panel", {
        title: "Admin",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  checkout: async (req, res) => {
    try {
      return res.status(200).render("payment");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  handleCheckout: async (req, res) => {
    try {
    } catch (error) {}
  },
  errorPage: async (req, res) => {
    return res.status(404).render("error", {
      title: "Error",
    });
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
};
