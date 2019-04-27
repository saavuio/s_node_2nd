import express from 'express';
import helpers from './helpers';

const wow: Action = {
  id: 1,
  name: 'test',
};

const x = undefined;

console.log(x);

console.log(wow);

helpers.x(wow);

console.log({
  ...wow,
  id: 4,
  id3: 2,
  id4: 5,
  id9: 3,
  idx: 1,
  ididdid: 2,
  xyz: 2,
});

const app: express.Application = express();

app.get(
  '*',
  (_, res): void => {
    res.send('<h1>Hello, world!</h1>');
  },
);

export default app;
