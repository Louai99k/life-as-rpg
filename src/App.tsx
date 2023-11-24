import Header from "@src/components/Main/Header";
import Sidebar from "@src/components/Main/Sidebar";
import clsx from "clsx";
import useExpand from "@src/components/Main/Sidebar/hooks/useExpand";
import Resources from "@src/components/Main/Resources";

const App = () => {
  const UseExpandRet = useExpand();
  const { expand } = UseExpandRet;

  return (
    <div className="flex h-screen">
      <div
        className={clsx(
          "h-full bg-zinc-900 transition-all",
          expand ? "w-1/6" : "w-[75px]"
        )}
      >
        <Sidebar {...UseExpandRet} />
      </div>
      <div
        className={clsx(
          "transition-all",
          expand ? "w-5/6" : "w-[calc(100%-75px)]"
        )}
      >
        <Header />
        <Resources />
        <div className="px-8 mt-8">
          <h3 className="text-2xl font-bold">Main Content</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
