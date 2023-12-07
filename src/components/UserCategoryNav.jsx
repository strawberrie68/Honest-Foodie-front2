import { GridFour, CookingPot, NotePencil, Brain } from "@phosphor-icons/react";
import { useState } from "react";
import { ProfileSection } from "../shared/profileSection";

const sections = [
  { id: ProfileSection.RECENT, icon: GridFour, label: "ALL" },
  { id: ProfileSection.RECIPES, icon: CookingPot, label: "RECIPES" },
  { id: ProfileSection.REVIEWS, icon: NotePencil, label: "REVIEWS" },
  { id: ProfileSection.TASTE_ID, icon: Brain, label: "TASTEBUDS" },
];

const UserCategoryNav = (props) => {
  const iconSize = 20;
  const [section, setSection] = useState("");

  function handleSectionClick(selectedSection) {
    setSection(selectedSection);
    console.log(`section: ${selectedSection}`);
    props.handleClick(selectedSection);
  }

  return (
    <div className="flex gap-8">
      {sections.map(({ id, icon: Icon, label }) => (
        <div
          key={id}
          id={section.label}
          className="flex flex-col"
          onClick={() => handleSectionClick(id)}
        >
          <div
            className={`h-1 w-full ${section === id ? "bg-black" : ""}`}
          ></div>
          <div className="mt-2 flex w-3/4 flex-row items-center gap-2 px-2 text-xxs font-semibold">
            <div>
              <Icon size={iconSize} />
            </div>
            <div>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCategoryNav;
