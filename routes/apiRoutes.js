// require/imports for express, fs, path and locally made notes. 
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json'); // get JSON data from db
const { nanoid } = require("nanoid");

// Notes methods/functions
function findById(id, notesArray) { // Gets the note by id
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}
// Old function
// function createNewNote(newNote) { // takes in new note and pushes the new value. 
//     notes.push(newNote);
//     fs.writeFile(path.resolve(__dirname, '../db.json'), JSON.stringify(notes)
//     );
// }
function createNewNote(newNote) { // takes in new note and pushes the new value.
    notes.push(newNote);
    updateDataBase()
}
function updateDataBase() {
    const pathToFile = path.resolve(__dirname, '../db/db.json');
    const data = JSON.stringify(notes);
    const options = 'utf8';
    const callback = err => err ? console.error(err) : false; // if good send 200 else send err. 
    fs.writeFile(pathToFile, data, options, callback);
}

// now router can use the app methods
router.get('/notes', (req, res) => {
    res.json(notes);
});
// get a note by 'id'
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
// post a note to body
router.post('/notes', (req, res) => {
    req.body.id = nanoid(7); // Jon Taylor taught me nanoid. This is used to ensure deletion doesn't cause id issues. 
    createNewNote(req.body);
    console.log(notes);
    res.json(notes);
});
// need to create router method that deletes a note 
router.delete('/notes/:id', (req, res) => {
    req.params.id
    notes.forEach((note, currIndex, arr) => {
        if (note.id === req.params.id) {
            arr.splice(currIndex, 1); // use this instead of delete!!!!! otherwise gives you empty node
        }
    })
    updateDataBase();
});

module.exports = router;