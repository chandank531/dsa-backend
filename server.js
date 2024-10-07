require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/envConfig');

console.log(config)
const heartRateRoutes = require('./src/routes/heart-rate.route');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', heartRateRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.send('OK');
});


let server;

require("./src/config/sequelize")
  .init()
  .then(() => {
    console.log(
      `Connected to Database: ${config.postgresdb.host}:${config.postgresdb.port}/${config.postgresdb.db}`
    );

    // call express server
    server = app.listen(config.port, () => {
      console.log(`Server Started at Port ${config.port}`);
    });
});

const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
};
  
const unexpectedErrorHandler = (error) => {
    console.log("error", error);
    console.log(error);
    exitHandler();
};
  
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
  
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
      server.close();
    }
});
  