const jwt = require('jsonwebtoken');

const KEY = process.env.SECRETKEY


const createJWT = (payload)=>{
  return JWT.sign(payload,KEY)
}

const verifyJWT = (token) =>{
  return JWT.verify(token,KEY)
}

module.exports={
  createJWT,
  verifyJWT
}