const urlGenerator = (url: string, prefix: string = "api") => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/${prefix}/${url}`;
};

export default urlGenerator;
