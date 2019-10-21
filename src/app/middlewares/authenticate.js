import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: false,
      error: 'Acesso não autorizado. Parâmetro token não foi enviado.',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secretJwt);
    req.userId = decoded.id;

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser) {
      return res.status(401).json({
        status: false,
        error: 'Acesso não autorizado. Usuário não encontrado.',
      });
    }

    return next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      error: 'Acesso não autorizado. Token inválido.',
    });
  }
};
