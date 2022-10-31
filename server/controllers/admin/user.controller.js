const User = require("../../models/user.model");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ admin: false });
      return res.status(200).json({ status: "success", Users: users });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json({ status: "Get Users success", user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Delete successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
