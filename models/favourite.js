const mongoose = require("mongoose");
const Student = require("./students");
const Teacher = require("./teacher");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema(
  {
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Student,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Teacher,
        required: true
    }
  },
  //include the 'created_id', 'updated_id' timestamps
  { timestamps: true }
);

//create the model with the schema
const Favourite = mongoose.model('favourite', FavouriteSchema);

//export the model
module.exports = Favourite;
