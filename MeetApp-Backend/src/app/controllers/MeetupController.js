import * as Yup from 'yup';
import { parseISO, isBefore, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  /**
   * @description List all meetups to user logged in app that not he created
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const { page, date } = req.query;
    const dateFormat = parseISO(date);
    const limitNumber = 10;

    const meetups = await Meetup.findAll({
      limit: limitNumber,
      offset: (page - 1) * 10,
      order: [['date', 'asc']],
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'files',
          attributes: ['name', 'path', 'url'],
        },
      ],
      where: {
        date: {
          [Op.between]: [startOfDay(dateFormat), endOfDay(dateFormat)],
        },
        user_id: {
          [Op.not]: req.userId,
        },
      },
    });

    if (!meetups.length) {
      return res.json({
        status: false,
        message: 'Nenhum meetup encontrado!',
      });
    }

    return res.json(meetups);
  }

  /**
   * @description Show meetup
   * @author Diego Souza
   * @param {req} req
   * @param {res} res
   */
  async show(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'files',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetup);
  }

  /**
   * @description Create new meetup
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      user_id: Yup.number().required(),
      localization: Yup.string().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: false,
        error: 'Valores de campos inválidos ou não preenchidos.',
      });
    }

    const dateForm = parseISO(req.body.date);

    // Check date meetup is passed
    if (isBefore(dateForm, new Date())) {
      return res.status(400).json({
        status: false,
        error: 'Nâo é possível cadastrar um MeetUp pra uma data anterior.',
      });
    }

    const { id, title, description, date, localization } = await Meetup.create(
      req.body
    );

    return res.json({
      id,
      title,
      description,
      date,
      localization,
    });
  }

  /**
   * @description Update meetup
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      user_id: Yup.number().required(),
      localization: Yup.string().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: false,
        error: 'Valores de campos inválidos ou não preenchidos.',
      });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    // Meetup doesn't exists
    if (!meetup) {
      return res.status(401).json({
        status: false,
        error: 'Esse meetup não existe.',
      });
    }

    // User logged not is owner from meetup
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        status: false,
        error:
          'Nâo é possível editar um meetup no qual você não é um organizador.',
      });
    }

    // Meetup is passed
    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        status: false,
        error: 'Nâo é possível editar um meetup que já foi realizado.',
      });
    }

    const { id, title, description, date, localization } = await meetup.update(
      req.body
    );

    return res.json({
      id,
      title,
      description,
      date,
      localization,
    });
  }

  /**
   * @description Destroy or delete meetup from platform
   * @author Diego Souza
   * @param {*} req
   * @param {*} res
   */
  async destroy(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    // Meetup doesn't exists
    if (!meetup) {
      return res.status(401).json({
        status: false,
        error: 'Esse meetup não existe.',
      });
    }

    // User logged not is owner from meetup
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        status: false,
        error:
          'Nâo é possível editar um meetup no qual você não é um organizador.',
      });
    }

    // Meetup is passed
    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        status: false,
        error: 'Nâo é possível deletar um meetup que já foi realizado.',
      });
    }

    meetup.destroy();

    return res.json({
      status: true,
      deleted: true,
    });
  }

  /**
   * Meetup than user create
   */
  async owner(req, res) {
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

export default new MeetupController();
