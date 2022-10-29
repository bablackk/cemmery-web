const User = require("../../models/user.model");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const allUser = await User.find({ admin: false });
      return res.status(200).json({ status: "success", User: allUser });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
