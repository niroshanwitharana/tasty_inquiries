// we got json data from frontend "user/inquiries" route.
// I assumed this is a small local business and Terence been keep saving this data as text files in his local server.

const express = require("express");
const app = express();
// import fs module to read and write file
const fs = require("fs");
const PORT = 8080;
app.use(express.json());

// creating inquiries route we got the req data from frontend
app.post("/user/inquiries", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    subscribe: req.body.subscribe,
  };
  console.log(data);
  const stringData = JSON.stringify(data);

  // creating a unique file name for every single customer
  const fileName = req.body.name.trim();

  function create(text, directory, filename) {
    //   if directory doesn't exist, create a new one
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      console.log("Directory created");
      create(text, directory);
    } else {
      fs.appendFile(`${directory}/${filename}.txt`, `${text}`, function (
        error
      ) {
        if (error) {
          throw error;
        } else {
          res.send("File created");
        }
      });
    }
  }

  // call create function
  create(stringData, "./inquiries", fileName);
});

// Start the express server
app.listen(PORT, () => {
  console.log(`express server started Port ${PORT}`);
});
