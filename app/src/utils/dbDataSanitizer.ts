export type DBDataSanitizerParams = {
  jsonFields: string[];
};

const defaultOptions: DBDataSanitizerParams = {
  jsonFields: [],
};

const dbDataSanitizer = (
  data: any[],
  o: Partial<DBDataSanitizerParams> = {}
) => {
  const options = { ...defaultOptions, ...o };

  const sanitizedData = data.map((item) => {
    const newItem: any = {};

    for (const key of Object.keys(item)) {
      const value = item[key];
      if (options.jsonFields.includes(key)) {
        newItem[key] = JSON.parse(value);
      } else {
        newItem[key] = value;
      }
    }

    return newItem;
  });

  return sanitizedData;
};

export default dbDataSanitizer;
