const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  student_id:{
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  gender:{
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  email:{
    type: String,
    required: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true
  },
  class:{
    type: String,
    enum: ["class1", "class2", "class3", "class4", "class5", "class6"],
    required: true
  },
  age:{
    type: Number,
    required: true
  }
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;