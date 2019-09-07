const UserCtrl = {};
const User = require('../models/User');

UserCtrl.signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0 || email.length <= 0 || password.length <= 0 || confirm_password.length <= 0) {
        errors.push({ text: 'por favor, rellena todos los campos' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'contraseñas deben ser de al menos 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error', `Email: ${email} ya esta en uso`);
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPass(password);
        await newUser.save();
        req.flash('success', 'Estas registrado');
        res.redirect('/users/signin');
    }
}

module.exports = UserCtrl;