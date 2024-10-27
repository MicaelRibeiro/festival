import type { Request, Response, Express, NextFunction } from 'express';
import { Home } from './handlers/home';
import { RegisterGuest } from './handlers/register-guest';
import { Guests } from './handlers/guests';

class ResponseError extends Error {
  public status: number = 0;
}

function authentication(req: Request, res: Response, next: NextFunction) {
  const authheader = req.headers.authorization;

  if (!authheader) {
    let err = new ResponseError('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');

  const user = auth[0];
  const pass = auth[1];

  if (user == 'admin' && pass == 'admin') {
    next();
  } else {
    let err = new ResponseError('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}
export function routes(app: Express) {
  app.get('/', Home);

  app.post('/register-guest', RegisterGuest);
  app.get('/register-guest', (req, res) => res.redirect('/'));

  app.get('/guests', authentication, Guests);
}
