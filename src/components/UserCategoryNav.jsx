import { GridFour, CookingPot, NotePencil, Brain } from "@phosphor-icons/react";
import { ProfileSection } from "../shared/profileSection";

const UserCategoryNav = ({ activeLabel, onNavItemClick }) => {
  const iconSize = 16;

  const navItems = [
    { label: ProfileSection.ALL, icon: <GridFour size={iconSize} /> },
    { label: ProfileSection.RECIPES, icon: <CookingPot size={iconSize} /> },
    { label: ProfileSection.REVIEWS, icon: <NotePencil size={iconSize} /> },
    { label: ProfileSection.TASTE_ID, icon: <Brain size={iconSize} /> },
  ];

  const handleKeyPress = (e, label) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavItemClick(label);
    }
  };

  return (
    <div className="flex max-w-lg flex-wrap justify-between sm:gap-6 md:gap-12">
      {navItems.map((item) => (
        <div
          key={item.label}
          className="flex cursor-pointer flex-col"
          tabIndex={0}
          role="button"
          aria-pressed={activeLabel === item.label}
          onClick={() => onNavItemClick(item.label)}
          onKeyPress={(e) => handleKeyPress(e, item.label)}
        >
          {/* Active state for <hr> */}
          <hr
            className={`h-1 w-full transition-all ${
              activeLabel === item.label
                ? "border-t-2 border-black"
                : "border-none"
            }`}
          ></hr>
          {/* Icon and label */}
          <div className="mt-2 flex w-full flex-row items-center gap-2 px-2 text-xxs font-semibold">
            <div className="hidden xs:block">{item.icon}</div>
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCategoryNav;
