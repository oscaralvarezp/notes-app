const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../helpers/auth');
const { signup } = require('../controllers/users.controller');
const passport = require('passport');

// Signin
router.route('/signin')
    .get(isNotLoggedIn,(req, res) =>{
        res.render('users/signin')
    })
    .post(passport.authenticate('local', {
        successRedirect: '/notes',
        failureRedirect: '/users/signin',
        failureFlash: true
    }));


// Signup
router.route('/signup')
    .get(isNotLoggedIn ,(req, res) => {
        res.render('users/signup');
    })
    .post(signup);

// Log out
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;