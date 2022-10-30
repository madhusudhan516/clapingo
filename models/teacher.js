const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  //include the 'created_id', 'updated_id' timestamps
  { timestamps: true }
);

//create the model with the schema
const Teacher = mongoose.model('teacher', TeacherSchema);

//export the model
module.exports = Teacher;
