const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
            res.status(500).json(err);
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
                expiresIn: "1d"
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
                res.status(200).json({...others, accessToken, refreshToken});
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
};

module.exports = authControllers;