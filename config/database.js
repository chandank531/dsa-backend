const defaultConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT
}

module.exports = {
  development: {
    ...defaultConfig
  },
  test: {
    ...defaultConfig
  },
  production: {
    ...defaultConfig
  }
}
