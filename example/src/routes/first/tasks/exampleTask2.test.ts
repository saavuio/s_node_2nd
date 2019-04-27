/* eslint-disable import/first */

// this file is only used to set mocks before importing the task

import { mockHelper } from './test-helpers';

// mocks used within tests are listed here. Responses can be set dynamically
// for each test.
const mocks = {
  axiosGet: mockHelper(jest, 'axios', 'get'),
  // simplePsqlQueryOne: mockHelper(jest, 'simple-psql', 'queryOne'),
};

import { tests } from './exampleTask2';

// ... actual tests are located within the task itself
tests(mocks);
