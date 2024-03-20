const Login = require('../models/LoginModel');
exports.index = (req, res) => {
    res.render('login');
};

/* exports.enter = (req, res) => {
    res.send('enter');
}; */

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(() => {
                return res.redirect("back");
            });
            return;
        }

        req.flash("success", 'Seu usuário foi criado');
        req.session.save(() => {
            return res.redirect("back");
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(() => {
                return res.redirect("back");
            });
            return;
        }

        req.flash("success", 'Você entrou no sistema');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect("/");
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout =  (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/enter");
    })
};