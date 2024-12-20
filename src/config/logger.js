const winston = require("winston");
const fs = require("fs");
const path = require("path");
require("winston-daily-rotate-file");
const config = require("./envConfig");

const logsDir = path.join(__dirname, "/../../logs");

try {
  fs.readdirSync(logsDir);
} catch (error) {
  fs.mkdirSync(logsDir);
}

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack,
    });
  }
  return info;
});

function parseToString(message, level) {
  if (level.indexOf("error") != -1) {
    return message;
  }
  return process.env.NODE_ENV != "production"
    ? JSON.stringify(message, null, 1)
    : JSON.stringify(message);
}

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.label({
      label: "Module",
    }),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, label, timestamp, message }) =>
        `${timestamp} ${level}: ${parseToString(message, level)}`
    )
  ),
  transports: [
    new winston.transports.Console({}),
    new winston.transports.DailyRotateFile({
      filename: path.join(logsDir, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: config.env === "development" ? "14d" : "60d",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: path.join(logsDir, "combined-%DATE%-error.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: config.env === "development" ? "14d" : "60d",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
    new winston.transports.File({
      level: "error",
      filename: path.join(logsDir, "error.log"),
    }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

global.logger = logger;
module.exports = logger;
