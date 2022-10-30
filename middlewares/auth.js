//token authentication

const jwt = require("jsonwebtoken");
const createError = require('http-errors');
require("dotenv").config();


module.exports = {

  //signAccessToken generates an access token using jwt
  signAccessToken: (user) => {

    //return the access token
    return new Promise((resolve, reject) => {

      //creating the jwt access token
      const payload = {};
      const options = { expiresIn: "1hr", audience: `${user._id}` };
      const secret = process.env.ACCESS_SECRET_TOKEN;

      //if no error resolve the promise else reject the promise by throwing an error
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  //auth function verifies the token sent by the user
  auth: (req, res, next) => {

    console.log(req.headers);
    //if no authorization in headers throw an error
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    
    /* Authorization header:
    Authorization: bearer token
    split it into two parts ['bearer', 'token'] and verify the 'token'
    */
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" "); //bearerToken = [0: 'bearer', 1: 'accessToken']
    const token = bearerToken[1]; //token = 'accessToken'

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          //if the error is 'jsonwebtokenerror' then throw error
          return next(createError.Unauthorized());
        } else {
          //other wise the jwt has expired and client need to refresh his token using refresh token
          return next(createError.Unauthorized(err.message));
        }
      }
      req.payload = payload;
      next();
    });
  },

};