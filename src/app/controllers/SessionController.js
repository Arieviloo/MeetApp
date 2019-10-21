import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  /**
   * @description Log in user
   * @author Diego Souza
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: false,
        error: 'Valores de campos inválidos ou não preenchidos.',
      });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ status: false, error: 'Dados de acesso inválidos.' });
      }

      if (!(await user.checkPassword(password))) {
        return res
          .status(401)
          .json({ status: false, error: 'Dados de acesso inválidos.' });
      }

      const { id, name } = user;
      const token = jwt.sign({ id }, authConfig.secretJwt, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: { id, name, email },
        token,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ status: false, error: 'Servidor inacessível.' });
    }
  }
}

export default new SessionController();
