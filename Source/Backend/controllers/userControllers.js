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
    updateUser: async(req, res) => {
        try {
            if (req.body.userId === req.params.id) {
                if (req.body.password) {
                  const salt = await bcrypt.genSalt(10);
                  req.body.password = await bcrypt.hash(req.body.password, salt);
                }
                try {
                  const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                      $set: req.body,
                    },
                    { new: true }
                  );
                  res.status(200).json(updatedUser);
                } catch (err) {
                  res.status(500).json(err);
                }
              } else {
                res.status(401).json("You can update only your account!");
              }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser: async(req, res) => {
        if (req.body.userId === req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                try {
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted...");
                } catch (error) {
                    res.status(500).json(err);
                }
            } catch (error) {
                res.status(404).json("User not found!");
            }
        }else{
            res.status(401).json("You can delete only your account!");
        }
    }
};

module.exports = userControllers;