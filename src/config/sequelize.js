const Sequelize = require("sequelize");
const envConfig = require('./envConfig')
const sequelize = new Sequelize(
  envConfig.postgresdb.db,
  envConfig.postgresdb.username,
  envConfig.postgresdb.password,
  {
    host: envConfig.postgresdb.host,
    dialect: "postgres",
    port: envConfig.postgresdb.port,

  }
);

function initiateConnection() {
  return sequelize.authenticate();
}

module.exports.connection = sequelize;
module.exports.init = initiateConnection;
module.exports.getTransaction = () => sequelize.transaction();


