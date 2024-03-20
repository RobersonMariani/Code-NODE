const mongoose = require('mongoose');
const validator = require('validator');
const ContactSchema = new mongoose.Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: false, default: '' },
    email: { type: String, require: false, default: '' },
    phone: { type: String, require: false, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
    constructor(body, userId) {
        this.body = body;
        this.userId = userId;
        this.errors = [];
        this.contact = null;
    }

    async register() {
        this.valida();

        if (this.errors.length > 0) return;
        this.contact = await ContactModel.create({ ...this.body, user: this.userId });
    }

    async searchForId(id) {
        if (typeof id !== 'string') return;
        const user = await ContactModel.findById(id);
        return user;
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.valida();

        if (this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    valida() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail inválido!");
        if (!this.body.name) this.errors.push('Nome é um campo obrigatório');
        if (!this.body.email && !this.body.phone) this.errors.push('Pelo menos um contato deve ser enviado: e-mail ou telefone');
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name || '',
            lastName: this.body.lastName || '',
            email: this.body.email || '',
            phone: this.body.phone || '',
        }
    }

    async getContacts(userId) {
        const contacts = await ContactModel.find({ user: userId }).sort({ createdAt: -1 });
        return contacts;
    }

    async delete(id) {
        if (typeof id !== 'string') return;
        const contact = await ContactModel.findOneAndDelete({ _id: id });
        return contact;
    }
}

module.exports = Contact;