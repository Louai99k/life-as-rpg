import { Card, Skeleton } from "@nextui-org/react";

const ItemsPageSkeleton = () => {
  return (
    <>
      <div className="px-8 mt-8 flex justify-between">
        <h3 className="text-2xl font-bold">Items</h3>
      </div>
      <div className="px-8 gap-4 grid grid-cols-4">
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="w-auto space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ItemsPageSkeleton;
