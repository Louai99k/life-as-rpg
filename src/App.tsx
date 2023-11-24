import Header from "@src/components/Main/Header";
import Sidebar from "@src/components/Main/Sidebar";
import useHover from "@src/hooks/useHover";

const App = () => {
  const { hovered, ref: hoverRef } = useHover();

  return (
    <div className="flex">
      <div ref={hoverRef} className="basis-1/6">
        <Sidebar />
      </div>
      <div className="basis-5/6">
        <Header />
      </div>
    </div>
  );
};

export default App;
