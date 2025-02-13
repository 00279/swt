export const prepareTimeout = (finishPageTimeOut: string) => {
  const parsedInt = Number.parseInt(finishPageTimeOut, 10);
  const parsedFloat = Number.parseFloat(finishPageTimeOut);
  return Number.isInteger(parsedInt) && parsedFloat === parsedInt
    ? parsedInt
    : undefined;
};
