/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MockHelperItem {
  setMockedResponses: (x: any[]) => void;
  getMock: () => any;
  getCallCount: () => number;
}

const mockedMembers: any = {};

const getResponse = (lib: string, member: string): any => {
  const response: any = {};
  response[member] = (): any => {
    const memberStore = mockedMembers[`${lib}-${member}`];
    const callNo = memberStore.callCounter;
    const mockResponse = memberStore.responses[callNo];
    memberStore.callCounter += 1;
    return mockResponse;
  };
  return response;
};

export const mockHelper = (jest: jest.Runtime, lib: string, member: string): MockHelperItem => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const mockFn = jest.fn(() => {
    return getResponse(lib, member);
    /*
    return {
      default: getResponse(lib, member),
    };
    */
  });
  mockedMembers[`${lib}-${member}`] = {
    mockFn,
    callCounter: 0,
  };
  jest.doMock(lib, mockFn);
  //
  return {
    setMockedResponses: (responses: any[]): void => {
      const memberStore = mockedMembers[`${lib}-${member}`];
      memberStore.callCounter = 0;
      memberStore.responses = responses;
    },
    getMock: (): any => mockedMembers[`${lib}-${member}`].mockFn,
    getCallCount: (): number => mockedMembers[`${lib}-${member}`].callCounter,
  };
};
