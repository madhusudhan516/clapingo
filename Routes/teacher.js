const express = require("express");
const router = express.Router();

const { loginTeacher, registerTeacher } = require("../controllers/teacher_controller");

router.get("", async (req, res, next) => {
  res.send("welcome to teacher route");
});

router.post("/login", loginTeacher);

router.post("", registerTeacher);


module.exports = router;
