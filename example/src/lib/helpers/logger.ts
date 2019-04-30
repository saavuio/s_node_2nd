export interface LoggerInput {
  error: Error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
}

export default ({ error }: LoggerInput): void => {
  console.log(error.message);
  // @TODO detect if error has "response" and output that nicely
  // console.log(input.meta && input.meta.req.baseUrl);
};
