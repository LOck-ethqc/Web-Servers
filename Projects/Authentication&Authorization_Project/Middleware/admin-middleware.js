const isAdmin = async(req,res, next)=>{
    if(req.userInfo.role != "admin"){ // checks if admin is written inside the payload data of the jwt
        // '.userInfo' data is forwarded from the first handler: 'auth-middleware.js' -> 'line 16'
        return res.status(403).json({
            "success": false,
            "error message": "You're not authorized!"
        });
    }
    next();
}

module.exports = isAdmin;
