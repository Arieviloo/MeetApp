import Sequelize, { Model } from 'sequelize';

class SubscriptionMeetup extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        meetup_id: Sequelize.INTEGER,
        enrolled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetups' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  }
}

export default SubscriptionMeetup;
