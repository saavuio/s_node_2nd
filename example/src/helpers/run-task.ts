// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runTask = async (task: any): Promise<any> => {
  let response;
  let error;
  let halt = false;
  try {
    response = await task;
  } catch (err) {
    error = err.message;
    halt = true;
  }
  return {
    response,
    halt,
    error,
  };
};

export default runTask;
