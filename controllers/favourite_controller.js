const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

// const db = require("../models");
const Favourite = require("../models/favourite");

const mostFavourite = asyncHandler(async (req, res, next) => {
    try {
        
        //find the most favourite teacher among all students
        /*
            group by teacher_id and return the response
            {maxcount: {$max: {"$count"}}},
            {match: {count: "$maxcount"}}
        */
        const mostFavouriteTeacher = Favourite.aggregate([
            {$group: {teacherID: "$teacher_id", count: {$count: {}}}}  
        ]);

        console.log(mostFavouriteTeacher);

        res.status(200).json({mostFavourite: mostFavouriteTeacher});

    } catch (error) {
        next(error);
    }
});

module.exports = { mostFavourite };
