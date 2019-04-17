const express = require("express");
const port = 6005;

const app = express();

app.listen(port).on("listening", () => {
  console.log(`Server running on ${port}`)
})