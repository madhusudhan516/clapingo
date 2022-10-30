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

router.get("/display",auth, displayTeachers);

router.post("/add", auth, addToFavourites);

router.get("/get", auth, getFavourites);

router.delete("/remove", auth, removeFromFavourites);

module.exports = router;
