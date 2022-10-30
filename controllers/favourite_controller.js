const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

// const db = require("../models");
const Favourite = require("../models/favourite");

const mostFavourite = asyncHandler(async (req, res, next) => {
    try {
        
        //find the most favourite teacher among all students
        /*
            group by teacher_id, filter and return the response
        */
        const mostFavouriteTeacher = await Favourite.aggregate([
            { $group: {
                _id: "$teacher_id",
                students: {"$push": "$student_id"},
                total_students: {"$sum": 1}
            }},
            {"$sort": { total_students: -1 }}
        ]);

        const frequent = mostFavouriteTeacher[0].total_students;

        //fiter out all the teachers who has same frquency
        const favourite = mostFavouriteTeacher
                .filter(item => item.total_students == frequent);        ;

        //this response consists of an array({_id(teacher_id), students: [list of students], total_students})
        res.status(200).json({mostfavourite: favourite});

    } catch (error) {
        next(error);
    }
});

module.exports = { mostFavourite };
