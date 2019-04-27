import express from 'express';
import bodyParser from 'body-parser';
import { struct } from 'superstruct';
// helpers
import runTask from '@/helpers/run-task';
// tasks
import exampleTask1 from './tasks/exampleTask1';
import exampleTask2 from './tasks/exampleTask2';

const UserInput = struct({
  id: 'number',
  name: 'string',
  quantity: 'number',
});

const app: express.Application = express();
app.use(bodyParser.json());

export default app.post(
  '*',
  async (req, res): Promise<void> => {
    const userInput = req.body;
    const userInputValidation = UserInput.validate(userInput);
    // @TODO input validation
    console.log(userInputValidation);

    // required variables
    let halt = false; // eslint-disable-line prefer-const
    let error;
    let task;
    let params;

    // TASK BLOCK 1
    if (!halt) {
      task = exampleTask1;
      params = { name: userInput.name };
      ({ halt, error } = await runTask(task(params)));
    }

    // TASK BLOCK 2
    if (!halt) {
      task = exampleTask2;
      params = { name: userInput.name };
      ({ halt, error } = await runTask(task(params)));
    }

    // RESULT
    if (!halt) {
      res.send('<h1>success</h1>');
    } else {
      res.send(`<h1>failure: ${error}</h1>`);
    }
  },
);
