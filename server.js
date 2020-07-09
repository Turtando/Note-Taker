// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//Set up the Express App
var app = express();
app.use(express.static("public"));

//Set up PORT
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VARIABLE/OBJECTS
var savedNotes = [];

// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

//Set up the Express App
var app = express();
app.use(express.static("public"));

//Set up PORT
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Function to read our data
function readFileHelper() {
  return new Promise((resolve, reject) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}
//Function to write our data to the server
function writeFileHelper(data) {
  fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
    if (err) {
      return false;
    }
    return true;
  });
}
// Start the database with an empty object and starting ID
function initializeFile() {
  writeFileHelper({
    id: 0,
    data: {},
  });
}

// ROUTES
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", function (req, res) {
  readFileHelper().then((stored) => {
    //start our note ids at 1 and create the object for them to be stored
    stored.id += 1;
    let addData = {
      id: stored.id,
      text: req.body.text,
      title: req.body.title,
    };
    stored.data[stored.id] = addData;
    writeFileHelper(stored);
    res.json(addData);
  });
});
// how the server reads the cards
app.get("/api/notes", function (req, res) {
  readFileHelper().then((fileContents) => {
    let result = Object.values(fileContents.data);
    res.json(result);
  });
});
// How the server delete the cards
app.delete("/api/notes/:id", function (req, res) {
  readFileHelper().then((fileContents) => {
    delete fileContents.data[req.params.id];
    writeFileHelper(fileContents);
    res.sendStatus(200);
  });
});
//Starts the Server
app.listen(PORT, function () {
  initializeFile();
  console.log("App listening on PORT " + PORT);
});
