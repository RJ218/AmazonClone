//status 502=> user not auth
const jwt = require("jsonwebtoken");
const config = require('../config');

module.exports = function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Authorization failed" });
    try {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) { res.status(502).send({ message: "Token Expired" }); }
            else {
                next();
            }
        });
        
  
    }catch(e){
        console.error(e);
        res.status(500).send({message:"Invalid Token"});
    };



}
