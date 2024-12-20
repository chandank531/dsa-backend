const logger = require("../config/logger");
const config = require("../config/envConfig");
const bcrypt = require("bcrypt");


function encryptPassword(password) {
  try {
    return bcrypt.hashSync(password, config.hashRounds);
  } catch (error) {
    throw error;
  }
}

function decryptPassword(hash, password) {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  encryptPassword,
  decryptPassword
};
