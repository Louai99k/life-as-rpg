import Header from "@src/components/Main/Header";
import Sidebar from "@src/components/Main/Sidebar";
import clsx from "clsx";
import useExpand from "@src/components/Main/Sidebar/hooks/useExpand";

const App = () => {
  const UseExpandRet = useExpand();
  const { expand } = UseExpandRet;

  return (
    <div className="flex h-screen">
      <div
        className={clsx(
          "h-full bg-background-800 transition-all",
          expand ? "w-1/6" : "w-[4%]"
        )}
      >
        <Sidebar {...UseExpandRet} />
      </div>
      <div className={clsx("transition-all", expand ? "w-5/6" : "w-[96%]")}>
        <Header />
      </div>
    </div>
  );
};

export default App;
