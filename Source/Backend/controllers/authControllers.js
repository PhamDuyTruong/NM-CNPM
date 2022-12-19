const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

let refreshTokens = [];
const authControllers = {
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
                phone: req.body.phone,
        });
        const user = await newUser.save();
        res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
       //Generate Token
    generateAccessToken: (user) => {
            return jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            }, 
            process.env.MY_SECRETKEY,
            {
                expiresIn: "30d"
            }
            );
        },
        generateRefreshToken: (user) => {
            return jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                }, 
                process.env.MY_REFRESHKEY,
                {
                    expiresIn: "365d"
                }
            )
        },
        getResetPasswordToken: (user) => {
            const resetToken = crypto.randomBytes(25).toString("hex");
            user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
            user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
            return resetToken;
        },
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
               return res.status(404).json("Wrong username !!!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if(!validPassword){
                return res.status(404).json("Wrong password !!!");
            }
            if(user && validPassword){
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure:false,
                    path: "/",
                    sameSite: "strict",
                });
                refreshTokens.push(refreshToken);
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }
        } catch (error) {
            res.status(500).json({error: error})
        }
    },
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.MY_REFRESHKEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure:false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            })
        })
    },
    forgotPassword: async(req, res, next) => {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                message: "User not found !!!"
            })
        }
        const resetToken = authControllers.getResetPasswordToken(user);
        await user.save();
        const resetPasswordUrl = `${req.protocol}://${req.get(
            "host"
          )}/api/auth/password/reset/${resetToken}`;
          const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
          try {
            await sendEmail({
                email: user.email,
                subject: `Winshop Password Recovery`,
                message,
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
              });
          } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(error);
          }
    },
    resetPassword: async(req, res) => {
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
    
      if (!user) {
        return res.status(400).json({
            message: "Reset Password Token is invalid or has been expired"
        })
      }
    
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
            message: "Password does not password"
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPass;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    
      await user.save();
      const accessToken = authControllers.generateAccessToken(user);
      const refreshToken = authControllers.generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
      });
      refreshTokens.push(refreshToken);
      const {password, ...others} = user._doc;
      res.status(200).json({...others, accessToken, refreshToken});
    },
    logOut: async(req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out successfully!");
    }
    
};

module.exports = authControllers;