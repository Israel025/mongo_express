const express = require("express");
const mongoose = require("mongoose");
const port = 6005;
const StudentRoute = require("./routes/StudentRoute");
const TeacherRoute = require("./routes/TeacherRoute");
const app = express();
// const cors = require('cors');

mongoose.connect("mongodb://localhost:27017/school-db").then(() => {
  console.log("Connected to mongo DB");
})
.catch(err => {
  console.log("Error Occured while connecting to MongoDB ", err);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/student', StudentRoute);

app.use('/teacher', TeacherRoute);

app.listen(port).on("listening", () => {
  console.log(`Server running on ${port}`);
});