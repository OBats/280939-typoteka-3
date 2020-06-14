'use strict';

const path = require(`path`);

const ExitCodes = {
  SUCCESS: 0,
  ERROR: 1
};

const DEFAULT_GENERATE_COUNT = 1;
const GENERATE_MAX_ITEMS_ALLOWED = 1000;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const HttpCodes = {
  HTTP_SUCCESS_CODE: 200,
  HTTP_NOT_FOUND_CODE: 404,
  HTTP_SERVER_ERROR_CODE: 500,
};
const PATH_TO_FILES = path.join(process.cwd(), `data`);
const PATH_TO_MOCKDATA = path.join(process.cwd(), `mockData`);

module.exports = {
  ExitCodes,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  HttpCodes,
  PATH_TO_FILES,
  PATH_TO_MOCKDATA,
  DEFAULT_GENERATE_COUNT,
  GENERATE_MAX_ITEMS_ALLOWED,
};
