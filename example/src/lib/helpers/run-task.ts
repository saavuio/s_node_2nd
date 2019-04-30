/* eslint-disable @typescript-eslint/no-explicit-any */
export interface KnownErrorMeta {
  userFacingMessage?: string;
  statusCode?: number;
  resultCode?: string;
}

export class KnownError extends Error {
  // eslint-disable-next-line
  meta: KnownErrorMeta;

  // eslint-disable-next-line
  constructor(message: string, meta: KnownErrorMeta = {}) {
    super(message);
    this.name = 'KnownError';
    this.meta = meta;
  }
}

export interface RunTaskResponse {
  response: any;
  halt: boolean;
  error?: KnownErrorMeta;
}

export const runTask = async (name: string, task: (...args: any[]) => any, params: any): Promise<RunTaskResponse> => {
  let response;
  const defaultKnownError: KnownErrorMeta = {
    resultCode: `${name}-failed-to-run`,
  };
  let errorOut;
  let halt = false;
  try {
    response = await task(params);
  } catch (error) {
    halt = true;
    if (error.name === 'KnownError') {
      errorOut = {
        userFacingMessage: error.meta.userFacingMessage || defaultKnownError.userFacingMessage,
        statusCode: error.meta.statusCode || defaultKnownError.statusCode,
        resultCode: error.meta.resultCode || defaultKnownError.resultCode,
      };
    } else {
      // @TODO logger catch unknown error logic here
      console.log(error);
      // throw error;
      errorOut = {
        userFacingMessage: 'Internal error',
        statusCode: 500,
        resultCode: 'internal-error',
      };
    }
  }
  return {
    response,
    halt,
    error: errorOut,
  };
};
