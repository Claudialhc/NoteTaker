# NoteTaker
This template is for a Note Taker application that allows the user to easily write down notes they need. This template was created using express node.js and Javascript.

 This app makes it easy for the user to write down their thoughts or pending things to do. When the user exits the app the notes written down are saved via the db.json file that makes it impossible for the user's notes to disapear unless the user deletes the note themself. When the user is finished with a specific note they can just click on the trash button next to the note to delete the note, this is the only way the note can disapear on the app.

 The code below is the code used to get the information the user types out on the app before being able to retrieve it by using app.post code: 
 ```js
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});
```

![NoteTakerIMG](assets/Note-Taker-app.png)

[GitHub Repo] (https://github.com/Claudialhc/NoteTaker)
Heroku Deployed URL: 