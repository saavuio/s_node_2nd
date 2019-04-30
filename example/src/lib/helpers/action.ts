export interface ActionResponseFormatStrict {
  message?: string;
  statusCode: number;
  resultCodes: {
    main: string;
    sub?: string;
  };
  data: {};
}

export interface ActionResponseFormatAmmend {
  message?: string;
  statusCode?: number;
  resultCodes?: {
    main?: string;
    sub?: string;
  };
  data?: {};
}

export const responseBuilder = (
  defaultVals: ActionResponseFormatStrict,
  customVals: ActionResponseFormatAmmend,
): ActionResponseFormatStrict => ({
  message: customVals.message || defaultVals.message,
  statusCode: customVals.statusCode || defaultVals.statusCode,
  resultCodes: {
    main: (customVals.resultCodes && customVals.resultCodes.main) || defaultVals.resultCodes.main,
    sub: (customVals.resultCodes && customVals.resultCodes.sub) || defaultVals.resultCodes.sub,
  },
  data: customVals.data || defaultVals.data,
});

export const defaultValidationLogic = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userInputValidation: [superstruct.StructError] | [undefined, any],
): ActionResponseFormatStrict | undefined => {
  const uive = userInputValidation[0]; // userInputValidationError
  if (uive) {
    const pathSpecificValidationMessage = `
      ${uive.path.join('.')} is not ${uive.type}
    `
      .trim()
      .replace(/\s\s+/g, ' ');
    // prettier-ignore
    const validationErrorMessage = uive.type
      ? pathSpecificValidationMessage
      : 'invalid keys';
    return {
      message: 'invalid params',
      statusCode: 400,
      resultCodes: { main: 'failure', sub: 'invalid-params' },
      data: { validationErrorMessage },
    };
  }
  return undefined;
};
