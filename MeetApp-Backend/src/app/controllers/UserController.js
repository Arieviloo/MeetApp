import * as Yup from 'yup';
import User from '../models/User';
import Meetup from '../models/Meetup';

class UserController {
  /**
   * @description Create new User
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: false,
        error: 'Valores de campos inválidos ou não preenchidos.',
      });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(401).json({
        status: false,
        error: 'Esse usuário já existe na plataforma.',
      });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  /**
   * @description Update user than is logged
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      oldPassword: Yup.string(),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required().min(6) : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: false,
        error: 'Valores de campos inválidos ou não preenchidos.',
      });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res
          .status(400)
          .json({ status: false, error: 'Usuário já existe na plataforma.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(400)
        .json({ status: false, error: 'Sua senha atual não confere.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  /**
   * @description List meetups than user logged is the owner
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async meetups_owner(req, res) {
    // Meetups from user logged is owner
    const meetups = await Meetup.findAll({
      order: [['date', 'asc']],
      where: {
        user_id: req.userId,
      },
    });

    if (!meetups.length) {
      return res.json({
        status: false,
        message: 'Você ainda não criou um meetup!',
      });
    }

    return res.json(meetups);
  }
}

export default new UserController();
