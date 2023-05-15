const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment', 'root', 'Divyanshu@97', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
