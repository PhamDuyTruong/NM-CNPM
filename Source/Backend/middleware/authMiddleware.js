const User = require("../models/User")
const jwt = require("jsonwebtoken");

const authMiddleware = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.token;
        if(token){
            try {
                const accessToken = token.split(' ')[1]
                const decoded = jwt.verify(accessToken, process.env.MY_SECRETKEY)

                req.user = await User.findById(decoded.id)

                next()
            } catch (error) {
                console.log(error)
                res.status(401).json("Not authorized, Token failed")
            }
        }else {
           return res.status(401).json("You're not authenticated");
        }
    },
};


module.exports = authMiddleware;