/* eslint-disable import/first,import/order */
import express from 'express';
import { superstruct } from 'superstruct';
// helpers
import { runTask, KnownError } from '@/lib/helpers/run-task'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { responseBuilder, defaultValidationLogic } from '@/lib/helpers/action';
import { defaultActionSuccessResponse, defaultActionFailureResponse } from '@/lib/helpers/shared-messages';
// tasks
import exampleTask1 from './tasks/exampleTask1';
import exampleTask2 from './tasks/exampleTask2';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const struct = superstruct({
  types: {
    validId: v => v === 'valid-value' || 'type not valid',
  },
});
/* eslint-enable @typescript-eslint/explicit-function-return-type */

const UserInput = struct({
  id: 'validId',
  name: 'string',
  details: struct.optional({
    town: 'string',
  }),
});

const app: express.Application = express();
app.use(express.json());

// @ts-ignore
const action = async (req: express.Request, res: express.Response): Promise<void> => {
  const userInput = req.body;
  const invalidParamsResponse = defaultValidationLogic(UserInput.validate(userInput));
  if (invalidParamsResponse) {
    res.send(invalidParamsResponse);
    return;
  }

  // required variables
  let halt = false; // eslint-disable-line prefer-const
  let error;
  let task;
  let params;
  let response; // eslint-disable-line @typescript-eslint/no-unused-vars

  // TASK BLOCK 1
  if (!halt) {
    task = exampleTask1;
    params = { name: userInput.name, req };
    ({ response, halt, error } = await runTask('exampleTask1', task, params));
  }

  // TASK BLOCK 2
  if (!halt) {
    task = exampleTask2;
    params = { name: userInput.name };
    ({ response, halt, error } = await runTask('exampleTask2', task, params));
  }

  // RESULT
  if (!error) {
    res.send(defaultActionSuccessResponse);
  } else {
    res.send(
      responseBuilder(defaultActionFailureResponse, {
        message: error && error.userFacingMessage,
        statusCode: error && error.statusCode,
        resultCodes: { sub: error && error.resultCode },
      }),
    );
  }
};

export default app.post('*', action);

/* eslint-disable import/first,import/order */
import { MockHelperItem, testBodyParser } from '@/lib/helpers/test';

export const tests = (
  doMock: boolean,
  mocks: Record<string, MockHelperItem>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { RequestMock, ResponseMock }: any,
): void => {
  it('invalid parameters', async (): Promise<void> => {
    // NOTE: generic cases should be tested with helpers/action.test.ts instead
    // of the way done below! (just an example)
    const rounds = [
      {
        body: '{}',
        message: 'id is not validId',
      },
      {
        body: '{ "name": "moi", "details": { "town": "123" }, "wow": "tada" }',
        message: 'invalid keys',
      },
      {
        body: '{ "name": "moi", "details": { "town": 123 } }',
        message: 'details.town is not {town} | undefined',
      },
    ];
    for (const round of rounds) {
      const reqMock = new RequestMock();
      reqMock.setBody(round.body);
      const req = (reqMock as unknown) as express.Request;
      const resMock = new ResponseMock();
      const res = (resMock as unknown) as express.Response;
      try {
        // eslint-disable-next-line no-await-in-loop
        await action(testBodyParser(req), res);
      } catch (err) {
        console.log(err);
      }
      expect(res.send).toBeCalledWith({
        ...defaultActionFailureResponse,
        message: 'invalid params',
        resultCodes: { main: 'failure', sub: 'invalid-params' },
        data: { validationErrorMessage: round.message },
      });
      if (doMock) expect(mocks.exampleTask1.callCount()).toBe(0);
    }
  });
  //
  it('all tasks succeed', async (): Promise<void> => {
    const reqMock = new RequestMock();
    reqMock.setBody('{ "id": "valid-value", "name": "test" }');
    const req = (reqMock as unknown) as express.Request;
    const resMock = new ResponseMock();
    const res = (resMock as unknown) as express.Response;
    await action(testBodyParser(req), res);
    expect(res.send).toBeCalledWith(defaultActionSuccessResponse);
    if (doMock) expect(mocks.exampleTask1.callCount()).toBe(1);
    if (doMock) expect(mocks.exampleTask2.callCount()).toBe(1);
  });
  //
  it('task failure variations', async (): Promise<void> => {
    // NOTE: we are not testing task logic here (all task runs should be mocked)
    const rounds = [
      {
        exampleTask1Response: new KnownError('test-failure'),
        exampleTask1CallCount: 1,
        exampleTask2Response: 'should-not-run',
        exampleTask2CallCount: 0,
        resultCode: 'exampleTask1-failed-to-run',
      },
      {
        exampleTask1Response: 'success',
        exampleTask1CallCount: 1,
        exampleTask2Response: new KnownError('test-failure'),
        exampleTask2CallCount: 1,
        resultCode: 'exampleTask2-failed-to-run',
      },
    ];
    for (const round of rounds) {
      mocks.exampleTask1.setMockedResponses([round.exampleTask1Response]);
      mocks.exampleTask2.setMockedResponses([round.exampleTask2Response]);
      const reqMock = new RequestMock();
      reqMock.setBody('{ "id": "valid-value", "name": "test" }');
      const req = (reqMock as unknown) as express.Request;
      const resMock = new ResponseMock();
      const res = (resMock as unknown) as express.Response;
      try {
        // eslint-disable-next-line no-await-in-loop
        await action(testBodyParser(req), res);
      } catch (err) {
        console.log(err);
      }
      expect(res.send).toBeCalledWith({
        ...defaultActionFailureResponse,
        resultCodes: { main: 'failure', sub: round.resultCode },
      });
      if (doMock) expect(mocks.exampleTask1.callCount()).toBe(round.exampleTask1CallCount);
      if (doMock) expect(mocks.exampleTask2.callCount()).toBe(round.exampleTask2CallCount);
    }
  });
};

process.on(
  // @ts-ignore
  'unhandledRejection',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (err: Error, promise: any): Promise<void> => {
    console.log(err);
    console.log(promise);
    // @TODO enable logger
    // await logger.error(err, { meta: { promise, tag: 'uncaughtRejection' } });
  },
);

process.on(
  'uncaughtException',
  // @ts-ignore
  async (err: Error): Promise<void> => {
    console.log(err);
    // @TODO enable logger
    // await logger.error(err, { meta: { tag: 'uncaughtException' } });
  },
);
