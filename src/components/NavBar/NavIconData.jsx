import { House, Binoculars, Book, Archive } from "@phosphor-icons/react";

const iconSize = 24;
const active = "#000000";
const inactive = "#9E9E9E";

export const navigationIcons = [
  {
    name: "Home",
    activeIcon: <House size={iconSize} color={active} weight="fill" />,
    inactiveIcon: <House size={iconSize} color={inactive} />,
    href: "/home",
    id: "nav-icon-home",
  },
  {
    name: "Explore",
    activeIcon: <Binoculars size={iconSize} color={active} weight="fill" />,
    inactiveIcon: <Binoculars size={iconSize} color={inactive} />,
    href: "/explore",
    id: "nav-icon-explore",
  },
  {
    name: "My Recipes",
    activeIcon: <Book size={iconSize} color={active} weight="fill" />,
    inactiveIcon: <Book size={iconSize} color={inactive} />,
    href: "/myrecipe",
    id: "nav-icon-user-recipes",
  },
  {
    name: "Saved",
    activeIcon: <Archive size={iconSize} color={active} weight="fill" />,
    inactiveIcon: <Archive size={iconSize} color={inactive} />,
    href: "/saved",
    id: "nav-icon-saved",
  },
];
