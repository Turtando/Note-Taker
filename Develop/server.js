// Dependencies
var express = require("express");
var path = require("path")

//Set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VARIABLE/OBJECTS
var savedNotes = [];

// ROUTES
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
  app.get("/api/savedNotes", function (req, res) {
    return res.json(savedNotes);
  });
  app.post("/api/savedNotes", function (req, res) {
    var newText = req.body;
      savedNotes.push(newText);
      res.json(newText);
  });
//Starts the Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });