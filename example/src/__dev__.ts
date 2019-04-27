import { Server, STATUS_CODES } from 'http';
import { parse } from 'url';

import action from './routes/first/action';

// eslint-disable-next-line global-require,import/no-extraneous-dependencies
require('dotenv').config({ path: 'env-development' });

const server = new Server(
  async (req, res): Promise<void> => {
    let pathname;
    if (req.url) pathname = parse(req.url).path;

    if (pathname === '/first/action') return action(req, res);

    res.writeHead(404);
    res.end(STATUS_CODES[404]);
    return undefined;
  },
);

const port = process.env.DEV_PORT || 3000;

server.listen(
  port,
  (): void => {
    console.log(`Listening for HTTP requests on port ${port}...`);
  },
);
