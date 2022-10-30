const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
    },
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
  },
  //include the 'created_id', 'updated_id' timestamps
  { timestamps: true }
);

//create the model with the schema
const Student = mongoose.model('student', StudentSchema);

//export the model
module.exports = Student;