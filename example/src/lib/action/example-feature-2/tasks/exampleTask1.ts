// @TODO import custom error handler
import axios from 'axios';
import psql from '@/lib/helpers/chatty-db';
import { internalErrorMessage } from '@/lib/helpers/shared-messages';
import logger from '@/lib/helpers/logger';
// types
import { Request } from 'express';

const invalidNameErrorMessage = 'known-error: invalid-name';

export interface Input {
  name: string;
  req: Request;
}

export interface Output {
  value: number;
}

export const taskResponseMocks = {
  success: (): Output => ({ value: 1 }),
  internalError: (): Error => new Error(internalErrorMessage),
  invalidNameError: (): Error => new Error(invalidNameErrorMessage),
};

const task = async (input: Input): Promise<Output> => {
  const { req } = input;
  console.log('start task 1');

  const query = await psql.queryOne('select now()', [], {
    role: 'admin',
  });
  console.log(query);

  try {
    await axios.get('http://demo1165121.mockablex.io/');
  } catch (error) {
    logger({ error, meta: { req } });
  }

  if (input.name === 'another') {
    const apiResponse = await axios.get('http://demo1165121.mockable.io/');
    console.log(apiResponse);
  }

  if (input.name === 'failing-name') {
    // two ways for error handling: use logger or throw known-error
    throw new Error(invalidNameErrorMessage);
  }

  return {
    value: 1,
  };
};

export default task;

/* eslint-disable import/first */
import { MockHelperItem } from '@/lib/helpers/test';

export const tests = (
  doMock: boolean,
  mocks: Record<string, MockHelperItem>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { RequestMock }: any,
): void => {
  it('task 1 test 1', async (): Promise<void> => {
    // prettier-ignore
    mocks.axiosGet.setMockedResponses([
      new Error('failed request'),
      { data: 'test data' },
    ]);
    // prettier-ignore
    mocks.simplePsqlQueryOne.setMockedResponses([
      { result: [] },
    ]);
    const reqMock = new RequestMock();
    reqMock.setBaseUrl('test-url.com');
    const req = (reqMock as unknown) as Request;
    await task({ name: 'test', req });
    if (doMock) expect(mocks.axiosGet.callCount()).toBe(1);
  });
  it('task 1 test 2', async (): Promise<void> => {
    // prettier-ignore
    mocks.axiosGet.setMockedResponses([
      new Error('failed request'),
      { data: 'test data' },
    ]);
    // prettier-ignore
    mocks.simplePsqlQueryOne.setMockedResponses([
      { result: ['one'] },
    ]);
    const reqMock = new RequestMock();
    const req = (reqMock as unknown) as Request;
    await task({ name: 'another', req });
    if (doMock) expect(mocks.axiosGet.callCount()).toBe(2);
  });
  it.only('should fail with invalid name', async (): Promise<void> => {
    // prettier-ignore
    mocks.axiosGet.setMockedResponses([
      { data: 'test data' },
    ]);
    // prettier-ignore
    mocks.simplePsqlQueryOne.setMockedResponses([
      { result: ['one'] },
    ]);
    const reqMock = new RequestMock();
    const req = (reqMock as unknown) as Request;
    try {
      await task({ name: 'failing-name', req });
    } catch (error) {
      expect(error.message).toBe(invalidNameErrorMessage);
    }
    if (doMock) expect(mocks.axiosGet.callCount()).toBe(1);
  });
};
