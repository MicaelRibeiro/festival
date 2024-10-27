import { Request, Response } from 'express';
import Tokens from 'csrf';
import Guest from '../models/Guest';

import { Op } from 'sequelize';

export async function RegisterGuest(request: Request, response: Response) {
  const alreadyExists = await Guest.findOne({
    where: {
      [Op.or]: [{ rg: request.body.rg }, { email: request.body.email }],
    },
  });

  if (alreadyExists) {
    return response.status(200).render('register-errors', {
      css: ['cadastro.css'],
      errors: ['Registro já cadastrado'],
    });
  }

  const tokens = new Tokens();
  const csrfSecret = request.cookies.CSRF_SECRET;

  const token = request.body._csrf;

  const guest = await Guest.create({
    name: request.body.nome,
    email: request.body.email,
    phone: request.body.telefone,
    rg: request.body.rg,
  });

  console.log('Register guest', {
    id: guest.id,
    name: guest.name,
  });

  response.status(200).render('register', { css: ['cadastro.css'], number: guest.id, token: csrfSecret, body: request.body });
}
