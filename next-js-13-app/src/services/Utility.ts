export const makeOptionArray = (
  objectArray: object[],
  value: string,
  title: string,
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

export const parseDateObject = (value: string) => {
  const date = new Date(value);

  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return {
    day: day,
    year: year,
    month: month,
  };
};
