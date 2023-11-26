import { Card, Skeleton } from "@nextui-org/react";

const MissionsPageSkeleton = () => {
  return (
    <>
      <div className="px-8 mt-8">
        <h3 className="text-2xl font-bold mb-4">Missions</h3>
        <Card className="flex flex-col p-4">
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="mt-4 w-full h-8 rounded" />
          <Skeleton className="mt-4 w-full h-8 rounded" />
        </Card>
      </div>
    </>
  );
};

export default MissionsPageSkeleton;
