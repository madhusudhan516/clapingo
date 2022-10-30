const express = require("express");
const router = express.Router();

const { loginTeacher, registerTeacher, getTeacher } = require("../controllers/teacher_controller");
const { auth } = require("../middlewares/auth");

//home page of teacher route
router.get("", async (req, res, next) => {
  res.send("welcome to teacher route");
});

//this route handles the login of teacher
router.post("/login", loginTeacher);

//this route handles the registration of a teacher into database
router.post("", registerTeacher);

//this route gets the details of the teacher by id
router.get("/:id", auth, getTeacher);

module.exports = router;
