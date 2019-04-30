/* eslint-disable import/first */
import { Request as RequestMock } from 'jest-express/lib/request';

// this file is only used to set mocks before importing the task

import { mockHelper, fakeMock } from '@/lib/helpers/test';

// const doMock = false;
const doMock = true;

// mocks used within tests are listed here. Responses can be set dynamically
// for each test.
const mocks = {
  axiosGet: doMock ? mockHelper(jest, 'axios', 'get') : fakeMock,
  // simplePsqlQueryOne: doMock ? mockHelper(jest, 'simple-psql', 'queryOne') : fakeMock,
  simplePsqlQueryOne: mockHelper(jest, 'simple-psql', 'queryOne'),
};

import { tests } from './exampleTask1';

// ... actual tests are located within the uut itself
tests(doMock, mocks, { RequestMock });
