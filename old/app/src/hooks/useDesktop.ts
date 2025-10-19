import { useState, useLayoutEffect } from "react";

const useDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    setIsDesktop(window.innerWidth > 992);
  }, []);

  return isDesktop;
};

export default useDesktop;
