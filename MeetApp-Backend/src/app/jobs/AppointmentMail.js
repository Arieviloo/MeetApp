import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../libs/Mail';

class AppointmentMail {
    get key() {
        return 'AppointmentMail';
    }

    async handle({ data }) {
        const { meetup, userLogged, enrolled_at } = data;

        // TODO: Send mail to owner meetup with subscription
        await Mail.sendMail({
            to: `${meetup.users.name} <${meetup.users.email}>`,
            subject: `Inscrição Recebida - ${meetup.title}`,
            template: 'subscription',
            context: {
                year: new Date().getFullYear(),
                title: meetup.title,
                owner: meetup.users.name,
                user: {
                    name: userLogged.name,
                    email: userLogged.email,
                    enrolled_at: format(
                        parseISO(enrolled_at),
                        "dd 'de' MMMM', ás' H:mm'h'",
                        {
                            locale: pt,
                        }
                    ),
                },
            },
        });
    }
}

export default new AppointmentMail();
