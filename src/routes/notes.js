const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');
const { index, create, findId, update, deleteNote } = require('../controllers/notes.controller');

// listing notes
router.route('/')
    .get(isAuthenticated , index);

// Create notes
router.route('/create')
    .get(isAuthenticated ,(req, res) => {
        res.render('notes/create-note');
    })
    .post(create);
// Edit Notes
router.route('/edit/:id')
    .get(findId)
    .put(update);
// Delete notes
router.delete('/delete/:id', deleteNote);


module.exports = router;