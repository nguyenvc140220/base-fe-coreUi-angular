export const removeNullValue = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    } else obj[key].trim();
  });
  return obj;
};
