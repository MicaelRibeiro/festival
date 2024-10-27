import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import { routes } from './routes';

import bodyParser from 'body-parser';

import session from 'express-session';
import cookieParser from 'cookie-parser';

import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';

import './database';

// configures dotenv to work in your application
dotenv.config();

const app = express();

app.use(cookieParser());

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  name: 'sessid',
  cookie: {
    maxAge: parseInt(process.env.COOKIE_EXPIRESIN || '2000'),
    sameSite: 'strict',
    domain: 'localhost',
    secure: false,
  },
});

app.use(sessionConfig);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const PORT = process.env.PORT;

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.use(connectLiveReload());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/assets/')));

routes(app);

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
