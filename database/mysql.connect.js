const config = require("../config/db");

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
      host: config.host,
      dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const db = sequelize;
module.exports = {db, DataTypes};
