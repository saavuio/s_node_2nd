/* eslint-disable import/first */
import { Request as RequestMock } from 'jest-express/lib/request';
import { Response as ResponseMock } from 'jest-express/lib/response';

// this file is only used to set mocks before importing the task

import { mockHelper, fakeMock } from '@/lib/helpers/test';

// const doMock = false;
const doMock = true;

// mocks used within tests are listed here. Responses can be set dynamically
// for each test.
const mocks = {
  exampleTask1: doMock ? mockHelper(jest, './tasks/exampleTask1') : fakeMock,
  exampleTask2: doMock ? mockHelper(jest, './tasks/exampleTask2') : fakeMock,
};

import { tests } from './exampleAction.route';

// ... actual tests are located within the uut itself
tests(doMock, mocks, { RequestMock, ResponseMock });
