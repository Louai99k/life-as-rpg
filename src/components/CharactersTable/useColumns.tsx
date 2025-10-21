import { useMemo } from "react";

interface KeyLabel {
  key: string;
  label: string;
}

const useColumns = () => {
  const columns = useMemo(() => {
    const columns: KeyLabel[] = [];

    columns.push({
      key: "name",
      label: "Character Name",
    });

    return columns;
  }, []);

  return columns;
};

export default useColumns;
