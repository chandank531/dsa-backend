const dotenv = require("dotenv-flow");
const path = require("path");
const Joi = require("joi");

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.string().optional(),
  }).unknown();

  const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: "key",
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    postgresdb: {
      host: envVars.DB_HOST,
      username: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
      db: envVars.DB_NAME,
      dialect: "postgres",
      port: envVars.DB_PORT || '5432',
      pool: {
        max: 10,
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    },
    hashRounds: 10,
    jwt: {
      authTokenExpiry: 604800, // 7d
      secretKey: envVars.JWT_SECRET_KEY,
    },
};
  