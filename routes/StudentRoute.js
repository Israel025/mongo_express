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
      message: "An error occured while getting students",
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

// Update and edit a student
router.put('/:student_id', async function(req, res) {
  try {
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { student_id: req.params.student_id },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        class: req.body.class,
        age: req.body.age,
      },
      { new: true }
    );

    // Check if student not found and updated
    if (!updatedStudent) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that Student record does not exist',
      });
    }

    res.json({
      status: 'success',
      data: updatedStudent,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Error occured while updating the student',
    });
  }
});

//edit a student
// router.patch("/:student_id", async function(req, res){
//   const editedStudent = await StudentModel.findOneAndUpdate(

//   );
// });

module.exports = router;