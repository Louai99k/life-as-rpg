const submitHelper = (cb: (data: any) => void) => {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    return cb(data);
  };
};

export default submitHelper;
