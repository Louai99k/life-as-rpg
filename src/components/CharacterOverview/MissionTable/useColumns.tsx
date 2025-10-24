import { useMemo } from "react";

interface KeyLabel {
  key: string;
  label: string;
}

const useColumns = () => {
  const columns = useMemo(() => {
    const columns: KeyLabel[] = [];

    columns.push(
      {
        key: "title",
        label: "Title",
      },
      {
        key: "type",
        label: "Type",
      },
      {
        key: "rank",
        label: "Rank",
      },
      {
        key: "actions",
        label: "Actions",
      },
    );

    return columns;
  }, []);

  return columns;
};

export default useColumns;
