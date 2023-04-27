export const removeNullValue = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    } else {
      if(typeof obj[key] == 'string'){
        obj[key] = obj[key].trim();
      } else if(Array.isArray(obj[key])){
        obj[key] = obj[key].join(',')
      }

    }
  });
  return obj;
};
