const express = require("express");
const bcrypt = require("bcrypt");
const TeacherModel = require("../models/TeacherModel");
const router = express.Router();

//create a new teacher
router.post("/", async (req, res) => {
  try{
    req.body.password = await bcrypt. hash(req.body.password, 10);
    req.body.teacher_id = `TR${Math.floor(1000 + Math.random() * 9000)}`;
    

    const teacher = await TeacherModel.create(req.body);

    res.status(200).json({
      status: "success",
      data: teacher
    });
  } catch(err){
    console.log(err);

    res.status(500).json({
      status: 500,
      message: "An error occured while creating your account"
    })
  }
});

// Get all teachers
router.get("", async function(req, res) {
  try {
    const teachers = await TeacherModel.find();
    res.json({
      status: "succcess",
      data: teachers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while getting teachers",
    });
  }
});

// Delete a teacher
router.delete('/:teacher_id', async function(req, res) {
  try {
    const deletedTeacher = await TeacherModel.findOneAndDelete({
      teacher_id: req.params.teacher_id,
    });

    if (!deletedTeacher) {
      res.status(404).json({
        status: 'error',
        message: "The Teacher's record does not exist",
      });
      return;
    };

    res.json({
      status: 'success',
      message: 'Teacher deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting the teacher',
    });
  }
});

// Update and edit a student
router.put('/:teacher_id', async function(req, res) {
  try {
    const updatedTeacher = await TeacherModel.findOneAndUpdate(
      { teacher_id: req.params.teacher_id },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        level: req.body.level,
        age: req.body.age,
        subject: req.body.subject,
      },
      { new: true }
    );

    // Check if student not found and updated
    if (!updatedTeacher) {
      res.status(404).json({
        status: 'error',
        message: "Sorry that Teacher's record does not exist",
      });
    }

    res.json({
      status: 'success',
      data: updatedTeacher,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Error occured while updating the teacher',
    });
  }
});

module.exports = router;