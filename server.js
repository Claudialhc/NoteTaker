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


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.
// The following API routes should be created:
// GET /api/notes - Should read the db.json file and return all saved notes as JSON. 

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});


// POST /api/notes - Should receive a new note to save on the request body (req.body!!!!),
// add it to the db.json file, and then return the new note to the client.


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

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.

app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  console.log(`Deleting note with ID ${noteID}`);
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteID;
  })
  for (currNote of savedNotes) {
      currNote.id = newID.toString();
      newID++;
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//----------Port Listener-------------//
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
