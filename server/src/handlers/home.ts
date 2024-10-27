import { Request, Response } from 'express';
import Tokens from 'csrf';

export function Home(request: Request, response: Response) {
  let tokens = new Tokens();
  var secret = tokens.secretSync();
  var token = tokens.create(secret);

  response
    .status(200)
    .cookie('CSRF_SECRET', secret, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      encode: String,
      domain: process.env.DOMAIN,
      expires: new Date(Date.now() + parseInt(process.env.CSRF_TOKEN_COOKIE_EXPIRESIN || '2000')),
    })
    .render('home', { csrf_token: token, css: ['formulario.css'] });
}
