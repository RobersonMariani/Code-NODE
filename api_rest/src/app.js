import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';
import express from 'express';
import home from './routes/home';
import user from './routes/user';
import aluno from './routes/aluno';
import token from './routes/token';
import file from './routes/file';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/alunos/', aluno);
    this.app.use('/tokens/', token);
    this.app.use('/files/', file);
  }
}

export default new App().app;
