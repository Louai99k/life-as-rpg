import { Card, CardBody } from "@nextui-org/react";

const Resources = () => {
  return (
    <div className="px-8 mt-8 mx-auto w-[80%] flex justify-center gap-4 flex-wrap">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Card className="basis-[200px] flex-grow" key={i}>
            <CardBody>
              <p>Money, LvL Points, XP, Ki</p>
            </CardBody>
          </Card>
        ))}
    </div>
  );
};

export default Resources;
