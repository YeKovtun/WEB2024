const UserModel = require('../models/userModel');

exports.getUsers = (req, res) => {
    const users = UserModel.getAllUsers();
    res.render('userListView', { users });
};

exports.getUser = (req, res) => {
    const users = UserModel.getAllUsers();
    const id = req.params['id'];
    const user = users.find(x => x.id == id);
    res.render('userView', { user });
};

exports.createUser = (req, res) => {
    const newUser = { id: Date.now(), name: req.body.name, email: req.body.email };
    UserModel.addUser(newUser);
    res.redirect('/');
};