import type { TabsNavigationProps } from "../../types/common.types";

function TabsNavigation({ activeTab, onTabChange, tabs }: TabsNavigationProps) {
  return (
    <nav
      className="flex bg-gray-200 rounded-full p-1 mb-4"
      aria-label="tabs"
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 md:px-6 py-[5px] text-xs md:text-sm font-medium rounded-full transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-white text-gray-900"
              : "text-gray-500 hover:text-gray-700 cursor-pointer"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabsNavigation;
