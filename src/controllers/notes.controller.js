const noteCrtl = {};
const Note = require('../models/Note');

noteCrtl.index = async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('notes/list-notes', { notes });
}

noteCrtl.create = async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Escribe un titulo por favor' });
    }
    if (!description) {
        errors.push({ text: 'Escribe una decripcion por favor' });
    }
    if (errors.length > 0) {
        res.render('notes/create-note', {
            errors,
            title,
            description
        });
    } else {
        const NewNote = new Note({ title, description });
        NewNote.user = req.user.id;
        await NewNote.save();
        req.flash('success', 'Nota agregada con exito');
        res.redirect('/notes');
    }
}

noteCrtl.findId = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note })
}

noteCrtl.update = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    await Note.findByIdAndUpdate(id, { title, description });
    req.flash('success', 'Nota actualizada con exito');
    res.redirect('/notes');
}

noteCrtl.deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    req.flash('success', 'Nota eliminada con exito');
    res.redirect('/notes');
}

module.exports = noteCrtl;