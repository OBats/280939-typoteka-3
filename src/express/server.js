'use strict';

const express = require(`express`);
const dayjs = require(`dayjs`);
const path = require(`path`);
const {HttpCodes} = require(`../config/constants`);
const {CustomError} = require(`../utils/utils`);
const {createLogger, LoggerNames} = require(`../utils/logger`);
const routers = require(`./router`);
require(`../../setup/localization.setup`);

require(`dayjs/locale/ru`);
dayjs.locale(`ru`);

const log = createLogger(LoggerNames.FRONTEND);
const logApi = createLogger(LoggerNames.FRONTEND_API);

const DEFAULT_PORT = process.env.FRONTEND_PORT;

const app = express();

app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, `public`)));

app.use((req, res, next) => {
  const {method, url} = req;
  logApi.debug(`${method} ${url}`);
  next();
});

Object.entries(routers).forEach(([key, router]) => app.use(key, router));

app.use((req, res, next) => {
  next(new CustomError(HttpCodes.NOT_FOUND, _f(`NO_ROUTE_IN_APP`)));
});

app.use((error, req, res) => {
  const {text, statusCode} = error;
  const {method, url} = req;
  logApi.error(`${method} ${url} - statusCode - ${statusCode}, text - ${text}`);
  res
    .status(statusCode)
    .render(`pages/errors/error`, {error});
});

app.listen(DEFAULT_PORT, (error) => {
  if (error) {
    log.error(error);
  } else {
    log.info(`Server running on port: ${DEFAULT_PORT}`);
  }
});
