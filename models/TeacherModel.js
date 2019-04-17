const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  teacher_id:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  level:{
    type: String,
    enum: ["level1", "level2", "level3", "level4", "level5"],
    required: true
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
  subject:{
    type: String,
    required: true,

  },
  age:{
    type: Number,
    required: true
  }
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);

module.exports = TeacherModel;