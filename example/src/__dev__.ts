import { Server, STATUS_CODES } from 'http';
import { parse } from 'url';

// import exampleAction1 from '@/lib/action/example-feature/exampleAction.route';
import exampleAction2 from '@/lib/action/example-feature-2/exampleAction.route';

// eslint-disable-next-line global-require,import/no-extraneous-dependencies
require('dotenv').config({ path: 'env-development' });

const server = new Server(
  async (req, res): Promise<void> => {
    let pathname;
    if (req.url) pathname = parse(req.url).path;
    console.log(pathname);

    // if (pathname === '/action/example-feature/exampleAction') return exampleAction1(req, res);
    if (pathname === '/action/example-feature-2/exampleAction') return exampleAction2(req, res);

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
