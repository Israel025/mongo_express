const express = require("express");
const bcrypt = require("bcrypt");
const StudentModel = require("../models/StudentModel");
const router = express.Router();

//create a new student
router.post("/", async (req, res) => {
  try{
    req.body.password = await bcrypt. hash(req.body.password, 10);
    req.body.student_id = `ST${Math.floor(1000 + Math.random() * 9000)}`;
    

    const student = await StudentModel.create(req.body);

    res.status(200).json({
      status: "success",
      data: student
    });
  } catch(err){
    console.log(err);

    res.status(500).json({
      status: 500,
      message: "An error occured while creating your account"
    })
  }
});

// Get all students
router.get("", async function(req, res) {
  try {
    const students = await StudentModel.find();
    res.json({
      status: "succcess",
      data: students,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while getting writer's",
    });
  }
});

// Delete a student
router.delete('/:student_id', async function(req, res) {
  try {
    const deletedStudent = await StudentModel.findOneAndDelete({
      student_id: req.params.student_id,
    });

    if (!deletedStudent) {
      res.status(404).json({
        status: 'error',
        message: 'The Student record does not exist',
      });
      return;
    };

    res.json({
      status: 'success',
      message: 'Student deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting the student',
    });
  }
});


module.exports = router;