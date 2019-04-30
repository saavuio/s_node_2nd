// @flow
if (process.env.NODE_ENV) {
  if (['development', 'test'].indexOf(process.env.NODE_ENV) !== -1) {
    // eslint-disable-next-line
    const dotenvResult = require('dotenv').config({ path: 'env-development' });
    if (dotenvResult.error) throw new Error(dotenvResult.error);
  }
}

const getConfig = (key: string): string | undefined => {
  if (!process.env[key]) throw new Error(`check config: ${key}`);
  return process.env[key];
};

const config = {
  DEV_PORT: getConfig('DEV_PORT'),
  DB_HOST: getConfig('DB_HOST'),
  DB_NAME: getConfig('DB_NAME'),
  DB_USER: getConfig('DB_USER'),
  DB_PASS: getConfig('DB_PASS'),
  DB_USER_DEV_MASTER: getConfig('DB_USER_DEV_MASTER'),
  DB_PASS_DEV_MASTER: getConfig('DB_PASS_DEV_MASTER'),
  CORE_DB_SCHEMA: getConfig('CORE_DB_SCHEMA'),
  JWT_SECRET: getConfig('JWT_SECRET'),
  LOG_KEY: getConfig('LOG_KEY'),
  LOG_APP: getConfig('LOG_APP'),
  LOG_TAGS: getConfig('LOG_TAGS'),
  NODE_ENV: getConfig('NODE_ENV'),
};

export default config;
