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
