const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); //tells the express app where the static assets are (front end js and css)

// The following HTML routes should be created:

// GET /notes - Should return the notes.html file.

// GET * - Should return the index.html file

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.


// The following API routes should be created:


// GET /api/notes - Should read the db.json file and return all saved notes as JSON. fs.readFile!!!!

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', function(err, data){
    if (err) console.log(JSON.parse(data));
    res.json(data);
  })
});

// POST /api/notes - Should receive a new note to save on the request body (req.body!!!!),
// add it to the db.json file, and then return the new note to the client.
// here you'll need to fs.readFile and writeFile, do both, in that order yay

// app.post("/api/reserve", (req, res) => {
//   console.log(req.body);
//   const newNote = req.body;
//   fs.readFile('./db/db.json', "utf8", function(err, data){
//     if (err) console.log(JSON.parse(data));
//     res.json(data);

app.post("/api/notes", function(req, res) {
  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const newNote = req.body;
  const uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
})
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. (req.params.id)
//This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
//you'll need to read all notes from the db.json file, remove the note with the given id property, 
//and then rewrite the notes to the db.json file.
// you'll also need to fs.readFile and writeFile in that order here


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//----------Port Listener-------------//
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});

// Acceptance Criteria
// Application should allow users to create and save notes.
// Application should allow users to view previously saved notes.
// Application should allow users to delete previously saved notes.