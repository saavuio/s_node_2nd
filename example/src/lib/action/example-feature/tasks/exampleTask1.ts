// @TODO import custom error handler
import axios from 'axios';
import { internalErrorMessage } from '@/lib/helpers/shared-messages';

const invalidNameErrorMessage = 'invalid name';

export interface Input {
  name: string;
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
  console.log('start task 1');

  await axios.get('http://demo1165121.mockable.io/');

  if (input.name === 'another') {
    await axios.get('http://demo1165121.mockable.io/');
  }

  if (input.name === 'fail') {
    throw new Error(invalidNameErrorMessage);
  }

  return {
    value: 1,
  };
};

export default task;

// eslint-disable-next-line import/first
import { MockHelperItem } from '@/lib/helpers/test';

export const tests = (mocks: Record<string, MockHelperItem>): void => {
  it('task 1 test 1', async (): Promise<void> => {
    // prettier-ignore
    mocks.axiosGet.setMockedResponses([
      { message: 'test 1' },
      { message: 'test 2' }
    ]);
    await task({ name: 'test' });
    expect(1).toBe(1);
    expect(mocks.axiosGet.callCount()).toBe(1);
  });
  it('task 1 test 2', async (): Promise<void> => {
    // prettier-ignore
    mocks.axiosGet.setMockedResponses([
      { message: 'test 3' },
      { message: 'test 4' }
    ]);
    await task({ name: 'another' });
    expect(1).toBe(1);
    expect(mocks.axiosGet.callCount()).toBe(2);
  });
};
