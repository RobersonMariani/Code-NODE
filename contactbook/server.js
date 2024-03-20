require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOCONNECTION)
    .then(() => {
        console.log('Conectado à base de dados.');
        app.emit('done');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');;
const csrf = require('csurf');
const { globalMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

//app.use(helmet()); // Configuração do Helmet para proteger o aplicativo contra ataques comuns.
app.use(express.static('frontend/assets/style.css'));
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOption = session({
    secret: 'asfsdfegergergeqrgeqrgqergergergdfgeiokjgweiojghopiehrgpuoiehrg',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000, // 30 minutos
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGOCONNECTION }),
});
app.use(sessionOption);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(globalMiddleware);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);
app.on('done', () => {
    app.listen(3000, () => {
        console.log('Servidor executando na porta 3000');
    });
});
