export const makeOptionArray = (
  objectArray: object[],
  value: string,
  title: string
) => {
  let options = [];

  if (objectArray.length > 0) {
    for (let index = 0; index < objectArray.length; index++) {
      const element: any = objectArray[index];
      options.push({
        value: element[value],
        title: element[title],
      });
    }
  }
  return options;
};

// export const getFormData = (object: any) =>
//   Object.keys(object).reduce((formData, key) => {
//     if (Array.isArray(object[key])) {
//       object[key] = JSON.stringify(object[key]);
//     }
//     formData.append(key, object[key]);
//     return formData;
//   }, new FormData());
