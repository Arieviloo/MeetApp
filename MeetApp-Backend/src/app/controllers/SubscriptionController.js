import { isBefore, isEqual } from 'date-fns';
import File from '../models/File';
import SubscriptionMeetup from '../models/SubscriptionMeetup';
import Meetup from '../models/Meetup';
import User from '../models/User';

import AppointmentMail from '../jobs/AppointmentMail';
import Queue from '../../libs/Queue';

class SubscriptionController {
    /**
     * @description List meetups than user logges is enrolled
     * @author Diego Souza
     * @param {*} req
     * @param {*} res
     */
    async index(req, res) {
        // Meetups from user logged is owner than not passed
        const meetups = await Meetup.findAll({
            order: [['date', 'asc']],
            include: [
                {
                    model: SubscriptionMeetup,
                    as: 'enrol_meetups',
                    where: { user_id: req.userId },
                    attributes: ['id', 'enrolled_at'],
                },
                {
                    model: File,
                    as: 'files',
                    attributes: ['name', 'path', 'url'],
                },
                {
                    model: User,
                    as: 'users',
                    attributes: ['name', 'email'],
                },
            ],
        });

        if (!meetups.length) {
            return res.json({
                status: false,
                message: 'Você ainda não se inscreveu em um meetup!',
            });
        }

        return res.json(meetups);
    }

    /**
     * @description Enrol user than is logged in meetup
     * @author Diego Souza
     * @param {*} req
     * @param {*} res
     */
    async store(req, res) {
        const { meetup_id } = req.body;

        const meetup = await Meetup.findByPk(meetup_id, {
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: ['name', 'email'],
                },
            ],
        });

        // Meetup doesn't exists
        if (!meetup) {
            return res.status(401).json({
                status: false,
                error: 'Esse Meetup não existe.',
            });
        }

        // User logged is owner of Meetup
        if (meetup.user_id === req.userId) {
            return res.status(401).json({
                status: false,
                error:
                    'Nâo é possível se isncrever em um MeetUp no qual você é um organizador.',
            });
        }

        // Meetup is passed
        if (isBefore(meetup.date, new Date())) {
            return res.status(401).json({
                status: false,
                error: 'Nâo é possível deletar um MeetUp que já foi realizado.',
            });
        }

        // Meetups from user logged
        const meetups_enrol = await SubscriptionMeetup.findAll({
            where: { user_id: req.userId },
            include: [
                {
                    model: Meetup,
                    as: 'meetups',
                    attributes: ['id', 'date'],
                },
            ],
        });

        // Check if user already enrolled this meetup
        const checkIsEnrol = meetups_enrol.filter(
            enrol => enrol.meetup_id === meetup_id
        );

        if (checkIsEnrol.length > 0) {
            return res.status(401).json({
                status: false,
                error: 'Você já está inscrito nesse MeetUp.',
            });
        }

        // Check if user is enrolled in the meetup in same date and hour
        const checkIsDate = meetups_enrol.filter(enrol =>
            isEqual(enrol.meetups.date, meetup.date)
        );

        if (checkIsDate.length > 0) {
            return res.status(401).json({
                status: false,
                error:
                    'Você já está inscrito em um MeetUp nesse mesmo horário.',
            });
        }

        const enrolled_at = new Date();
        const { id } = await SubscriptionMeetup.create({
            meetup_id,
            enrolled_at,
            user_id: req.userId,
        });

        // User logged
        const userLogged = await User.findByPk(req.userId);

        // Fire Mail Queue
        await Queue.add(AppointmentMail.key, {
            meetup,
            userLogged,
            enrolled_at,
        });

        return res.json({ id });
    }

    /**
     * Unsubscriber user from meetups
     */
    async destroy(req, res) {
        const { id } = req.params;
        const subscribe = await SubscriptionMeetup.findOne({
            where: {
                meetup_id: id,
                user_id: req.userId,
            },
        });

        subscribe.destroy();

        return res.json({
            status: true,
        });
    }
}

export default new SubscriptionController();
