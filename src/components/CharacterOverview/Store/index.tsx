import { Tab, Tabs, type TabsProps } from "@heroui/react";
import Skills from "./Skills";
import SkillsIcon from "@src/icons/SkillsIcon";
import MagicIcon from "@src/icons/MagicIcon";
import { useState } from "react";
import ItemsIcon from "@src/icons/ItemsIcon";
import Magic from "./Magic";

type TabColor = TabsProps["color"];

const tabs = ["skills", "magic", "items"] as const;

type TabCode = (typeof tabs)[number];

const getTabColor = (tab: TabCode): TabColor => {
  switch (tab) {
    case "magic":
      return "secondary";
    case "items":
      return "success";
    case "skills":
    default:
      return "primary";
  }
};

const Store = () => {
  const [tab, setTab] = useState("skills");

  return (
    <div className="mt-8 px-8">
      <Tabs
        selectedKey={tab}
        onSelectionChange={(t) => setTab(t.toString())}
        classNames={{
          tabList: "gap-8",
        }}
        color={getTabColor(tab as TabCode)}
        variant="bordered"
        size="lg"
        aria-label="Tabs"
      >
        <Tab
          key="skills"
          title={
            <div className="flex items-center space-x-2">
              <SkillsIcon />
              <span>Skills</span>
            </div>
          }
        >
          <Skills />
        </Tab>
        <Tab
          key="magic"
          title={
            <div className="flex items-center space-x-2">
              <MagicIcon />
              <span>Magic</span>
            </div>
          }
        >
          <Magic />
        </Tab>
        <Tab
          key="items"
          title={
            <div className="flex items-center space-x-2">
              <ItemsIcon />
              <span>Items</span>
            </div>
          }
        ></Tab>
      </Tabs>
    </div>
  );
};

export default Store;
