// require/imports for express, fs, path and locally made notes. 
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json'); // get JSON data from db

// Notes methods/functions
function findById(id, notesArray) { // Gets the note by id
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}
function createNewNote(newNote) { // takes in new note and pushes the new value. 
    notes.push(newNote);
    fs.writeFile(path.resolve(__dirname, '../db.json'),
        JSON.stringify(notes)
    );
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
    req.body.id = notes.length.toString(); // set id based on what the next index of the array will be
    createNewNote(req.body);
    res.json(notes);
});
// need to create router method that deletes a note 


module.exports = router;