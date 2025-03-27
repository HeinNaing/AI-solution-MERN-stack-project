const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(400).json({message: "Token is required"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = decoded;
        next();
    });
    
}

module.exports = AuthMiddleware;
