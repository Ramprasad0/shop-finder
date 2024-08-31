const jwt = require('jsonwebtoken');
const secretKey = 'tomato'; 

const authenticateJWT = (req, res, next) => {
   
    if (req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
           const token = parts[1];
           req.token=token;
           next();
        }
    }else{
       return res.status(403).send({messag:'token is not valid'});
    }
};

module.exports = authenticateJWT;
