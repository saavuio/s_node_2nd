/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';

export interface MockHelperItem {
  setMockedResponses: (x: any[]) => void;
  getMock: () => any;
  callCount: () => number;
}

export const fakeMock = {
  setMockedResponses: (): void => {},
  getMock: (): undefined => undefined,
  callCount: (): number => 0,
};

const mockedMembers: any = {};

const getResponse = (lib: string, member?: string): any => {
  //
  const memberPath = `${lib}-${member || 'default'}`;
  // console.log(`call to ${memberPath}`);
  const responseFunction = (): any => {
    const memberStore = mockedMembers[memberPath];
    const callNo = memberStore.callCounter;
    let mockResponse: any = '';
    // use user defined response
    if (memberStore.responses && memberStore.responses[callNo]) {
      mockResponse = memberStore.responses[callNo];
    }
    memberStore.callCounter += 1;
    if (mockResponse instanceof Error) {
      throw mockResponse;
    } else {
      return mockResponse;
    }
  };
  let response: any;
  if (member) {
    // if member provided, return an object keyd with the member name refering
    // to the function
    response = {};
    response[member] = responseFunction;
  } else {
    // if no member provided, directly refer to the response function
    response = responseFunction;
  }
  return response;
};

export const mockHelper = (jest: jest.Runtime, lib: string, member?: string): MockHelperItem => {
  //
  const memberPath = `${lib}-${member || 'default'}`;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const mockFn = jest.fn(() => {
    return getResponse(lib, member);
  });
  mockedMembers[memberPath] = {
    mockFn,
    callCounter: 0,
  };
  jest.doMock(lib, mockFn);
  //
  return {
    setMockedResponses: (responses: any[]): void => {
      const memberStore = mockedMembers[memberPath];
      memberStore.callCounter = 0;
      memberStore.responses = responses;
    },
    getMock: (): any => mockedMembers[memberPath].mockFn,
    callCount: (): number => {
      // not also resetting counter!
      const count = mockedMembers[memberPath].callCounter;
      mockedMembers[memberPath].callCounter = 0;
      return count;
    },
  };
};

export const testBodyParser = (req: express.Request): express.Request => {
  return {
    ...req,
    body: JSON.parse(req.body),
  } as express.Request;
};
