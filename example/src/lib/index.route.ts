import express from 'express';

const app: express.Application = express();

export default app.all(
  '*',
  async (_, res): Promise<void> => {
    res.send('empty');
  },
);
