const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../middlewares/auth");


// const db = require("../models");
const Teacher = require("../models/teacher");


//Handles teacher login
const loginTeacher = asyncHandler(async (req, res, next) => {

    try {
  
      //Get the data from the request body
      const { email, password } = req.body;
  
      //If any of the feilds are empty then throw an error
      if (!email || !password) {
        throw createError.BadRequest("Enter all the details");
      }
  
      //Get the teacher details from the database
      const user = await Teacher.findOne({ email: email });
  
      //If the teacher does not exist or the passwords don't match then throw an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw createError.Unauthorized(`Incorrect email or password`);
      }
  
      //after successful login generate a access token
      const aToken = await signAccessToken(user);

      //Set the response status to 200 and send the details
      res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          accessToken: aToken,
        });
  
    } catch (error) {
      next(error);
    }
  
});

const registerTeacher = asyncHandler(async (req, res, next) => {
  try {

      const { name, email, password, phoneNumber } = req.body;

      if (!name || !email || !password) {
          throw createError.BadRequest(`Enter all fields ${name || ""}`);
      }

      console.log(await Teacher.findOne({}));

      //Throw error if email is already registered
      if (await Teacher.findOne({ email: email })) {
          throw createError.Conflict(`${email} is already registered!`);
      }

      //Hash the password
      const hashedPass = await bcrypt.hash(password, 10);

      const user = await Teacher.create({...req.body, password: hashedPass});

      //after successful login generate a access token
      const aToken = await signAccessToken(user);
    
      res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          accessToken: aToken,
        });

  } catch (error) {
      next(error);
  }
});

  
module.exports = { loginTeacher, registerTeacher };
