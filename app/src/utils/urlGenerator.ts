const urlGenerator = (url: string, prefix: string = "api") => {
  return `${process.env.BASE_URL}/${prefix}/${url}`;
};

export default urlGenerator;
