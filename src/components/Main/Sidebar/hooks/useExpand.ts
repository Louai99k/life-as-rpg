import { useState, useCallback } from "react";

const useExpand = () => {
  const [expand, setExpand] = useState(false);

  const onCollapse = useCallback(() => {
    setExpand(false);
  }, []);

  const onExpand = useCallback(() => {
    setExpand(true);
  }, []);

  return {
    expand,
    onCollapse,
    onExpand,
  };
};

export default useExpand;
