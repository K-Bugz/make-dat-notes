// require/imports for express, fs, path and locally made notes. 
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { notes } = require('../db/db.json'); // get JSON data from db

// Notes methods/functions
function findById(id, notesArray) { // Gets the note by id
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}
function createNewNote(body, notesArray) { // takes in new note and pushes the new value. 
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notes;
}
function validateNote(note) { // validates note data value type
    if (!note.name || typeof note.name !== 'string') {
        return false;
    }
    return true;
}


// now router can use the app methods
// router.get('/notes', (req, res) => {
//     let results = notes; // gets jason data (a mock data from server)
//     // not sure if we need the below. 
//     // if (req.query) {
//     //     results = filterByQuery(req.query, results);
//     // }
//     res.json(results);
// });
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
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const notes = createNewNote(req.body, notes);
        res.json(notes);
    }
});
// need to create router method that deletes a note 


module.exports = router;