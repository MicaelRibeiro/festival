import { Request, Response } from 'express';
import Guest from '../models/Guest';

export async function Guests(request: Request, response: Response) {
  const data = await Guest.findAll();

  const guests = data.map((item) => item.toJSON());

  response.status(200).render('guests', { css: ['lista.css'], guests });
}
