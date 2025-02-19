type ConvertToType = [unknown, string];

export const convertToType = ([value, type]: ConvertToType) => {
  if (type === 'number') {
    return Number(value);
  }
  if (type === 'null') {
    return null;
  }
  if (type === 'undefined') {
    return undefined;
  }
  if (type === 'boolean') {
    return Boolean(value);
  }
  return value;
};
