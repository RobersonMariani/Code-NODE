const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const {loginRequired} = require('./src/middlewares/middleware');

// Rotas da Home
route.get('/', homeController.index);

//Rotas de login
route.get('/enter', loginController.index);
route.post('/enter/register', loginController.register);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);

//Rotas de contato
route.get("/contact", loginRequired, contactController.index);
route.post("/contact/register", loginRequired, contactController.register);
route.get("/contact/:id", loginRequired, contactController.editData);
route.post("/contact/edit/:id", loginRequired, contactController.edit);
route.get("/contact/delete/:id", loginRequired, contactController.delete);

module.exports = route; //exporta a rota para ser usada em outro arquivo