/* eslint-disable import/prefer-default-export */
export const internalErrorMessage = 'internal error';

export const defaultActionSuccessResponse = {
  message: 'success',
  statusCode: 200,
  resultCodes: {
    main: 'success',
    sub: '',
  },
  data: {},
};

export const defaultActionFailureResponse = {
  message: 'failure',
  statusCode: 400,
  resultCodes: {
    main: 'failure',
    sub: '',
  },
  data: {},
};
