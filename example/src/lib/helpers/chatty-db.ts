import SimplePSQL from 'simple-psql';
import config from '@/lib/helpers/config';

export default new SimplePSQL(
  {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
  },
  {
    rolePrefix: 'saavu_app_api_',
  },
);

export const devPsql = new SimplePSQL({
  host: config.DB_HOST,
  user: config.DB_USER_DEV_MASTER,
  password: config.DB_PASS_DEV_MASTER,
  database: config.DB_NAME,
});
