const Contact = require('../models/ContactModel')

exports.index = async (req, res) => {
    let contacts = [];
    if (req.session.user) {
        const contactModel = new Contact();
        contacts = await contactModel.getContacts(req.session.user._id);
    }
    res.render('index', { contacts });
};