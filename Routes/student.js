const express = require("express");
const router = express.Router();

const { registerStudent, displayTeachers, addToFavourites, getFavourites, removeFromFavourites, loginStudent } = require("../controllers/student_controller");
const { auth } = require("../middlewares/auth");

const Student = require("../models/students");

//register request to /api/register' willbe handled by the 'registerStudent' function
router.post("", registerStudent);

router.get("", async(req, res, next) => {
    res.send(await Student.find({}, {password: 0}));
})

//POST requests to '/api/login' will be handled by the 'loginStudent' function
router.post("/login", loginStudent);

//GET request to display all teachers in order to add into favourites
router.get("/display",auth, displayTeachers);

//post request to 'student/add' to add a favourite teacher
router.post("/add", auth, addToFavourites);

//get request to 'student/get' ro get all the favourite teachers
router.get("/get", auth, getFavourites);

//delete request to remove teacher from favourite list
router.delete("/remove", auth, removeFromFavourites);

module.exports = router;
