const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateJWT=(req,res,next)=>{
const authHeader=req.headers["authorization"];
const token=authHeader && authHeader.split(" ")[1];

if(token==null){
    return res.send("no token")
}
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
        res.send("invlalid token")
    }
    req.user=user;
    next()
})
}

module.exports=authenticateJWT