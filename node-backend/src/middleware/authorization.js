const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if(error)
                res.status(403).json({
                    message: "Token is not valid"
                });
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json({
            message: "You are not authenticated."
        })
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json({message: "You are not the authorized user."});
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.roleId === 2) {
        next();
      } else {
        res.status(403).json({message: "You do not have admin privileges. Please login as an admin."});
      }
    });
  };

const verifyTokenAndSuperAdmin = (req, res, next) => {
verifyToken(req, res, () => {
    if (req.user.roleId === 4) {
    next();
    } else {
    res.status(403).json({message: "You do not have super admin privileges. Please login as a super admin."});
    }
});
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSuperAdmin };