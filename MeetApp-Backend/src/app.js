import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());

    // Check if exists path tmp/uploads - create if not exists
    if (!fs.existsSync(path.resolve(__dirname, '..', 'tmp', 'uploads'))) {
      fs.mkdirSync(path.resolve(__dirname, '..', 'tmp', 'uploads'));
    }

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
