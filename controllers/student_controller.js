const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const mongoose  = require("mongoose");
const { signAccessToken } = require("../middlewares/auth");

// const db = require("../models");
const Student = require("../models/students");
const Teacher = require("../models/teacher");
const Favourite = require("../models/favourite");


//Handles user login
const loginStudent = asyncHandler(async (req, res, next) => {

    try {
  
      //Get the data from the request body
      const { email, password } = req.body;
  
      //If any of the feilds are empty then throw an error
      if (!email || !password) {
        throw createError.BadRequest("Enter all the details");
      }
  
      //Get the user details from the database
      const user = await Student.findOne({ email: email });
      
      
      //If the user does not exist or the passwords don't match then throw an error
      if (user.length < 1 || !(await bcrypt.compare(password, user.password))) {
        throw createError.Unauthorized(`Incorrect email or password`);
      }
  
      //after successful login generate a access token
      const aToken = await signAccessToken(user);

      //Set the response status to 200 and send the details
      res.status(200).json({
          id: user._id,
          student_id: user.student_id,
          name: user.name,
          email: user.email,
          accessToken: aToken,
        });
  
    } catch (error) {
      next(error);
    }
  
  });

const registerStudent = asyncHandler(async (req, res, next) => {
    try {

        const { student_id, name, email, password } = req.body;

        if (!student_id || !name || !email || !password) {
            throw createError.BadRequest(`Enter all fields ${name || ""}`);
        }

        //Throw error if email is already registered
        if (await Student.findOne({ where: { email: email } }) === null) {
            throw createError.Conflict(`${email} is already registered!`);
        }

        //Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await Student.create({...req.body, password: hashedPass});

        //after successful login generate a access token
        const aToken = await signAccessToken(user);
      
        res.status(201).json({
            id: user._id,
            student_id: user.student_id,
            name: user.name,
            email: user.email,
            accessToken: aToken,
          });

    } catch (error) {
        next(error);
    }
});


const displayTeachers = asyncHandler(async (req, res, next) => {
    try {

        const teachers = await Teacher.find({}, {name: 1, email: 1, phoneNumber: 1});

        //if no teacher found
        if(!teachers){
            res.status(404).send(`No teacher found`);
        }

        //send the teachers list [(username, email, phoneNumber)]
        res.status(200).send(teachers);

    } catch (error) {
        next(error);
    }
});


const addToFavourites = asyncHandler(async (req, res, next) => {
    try {

        //get the teacher_id from the student
        const { teacher_id } = req.body;
        const student_id = req.payload.aud;

        const favouriteList = {student_id: student_id, teacher_id: teacher_id};

        //check whether teacher is already added to favourites or not
        const teacher = await Favourite.findOne({ teacher_id: teacher_id });

        if (!teacher) {
            await Favourite.create({ student_id: student_id, teacher_id: teacher_id});
        }

        res.status(201).send("added to favourites");
        
    } catch (error) {
        next(error);
    }
});

const getFavourites = asyncHandler(async (req, res, next) => {
    try {
        //get the student_id
        console.log(req.payload);
        const student_id = req.payload.aud;

        //retreive all the favourite teachers of that student
        const favourite_teachers = await Favourite.find({ student_id }, {__v: 0});

        res.status(200).send(favourite_teachers);

    } catch (error) {
        next(error);
    }
});

const removeFromFavourites = asyncHandler(async (req, res, next) => {
    try {
        
        //get the id from the params
        const { id } = req.body;

        //find the favourite list from database and delete the favourite list
        const favouriteList = await Favourite.findByIdAndDelete(id);

        if (!favouriteList) {
            throw createError.NotFound("No favourite List Found");
        }

        res.status(201).send("removed from favourites");
        
    } catch (error) {
        if (error instanceof mongoose.CastError){
            next(createError("invalid favourite id"));
        }
        next(error);
    }
});



module.exports = { displayTeachers, registerStudent, loginStudent, addToFavourites, removeFromFavourites, getFavourites };
