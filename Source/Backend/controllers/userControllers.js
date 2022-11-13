const User = require("../models/User");
const bcrypt = require("bcrypt");


const userControllers = {
    getAllUser: async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getUserById: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
          } catch (err) {
            res.status(500).json(err);
          }
    },
};

module.exports = userControllers;