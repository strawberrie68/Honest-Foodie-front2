import { House, Binoculars, Book, Archive } from "@phosphor-icons/react";

const activeColor = "#000000";
const inactiveColor = "#737373";
const iconSize = 24;

export const navigationIcons = [
  {
    name: "Home",
    activeIcon: <House size={iconSize} color={activeColor} weight="fill" />,
    inactiveIcon: <House size={iconSize} color={inactiveColor} />,
    href: "/",
  },
  {
    name: "Explore",
    activeIcon: (
      <Binoculars size={iconSize} color={activeColor} weight="fill" />
    ),
    inactiveIcon: <Binoculars size={iconSize} color={inactiveColor} />,
    href: "/explore",
  },
  {
    name: "My Recipes",
    activeIcon: <Book size={iconSize} color={activeColor} weight="fill" />,
    inactiveIcon: <Book size={iconSize} color={inactiveColor} />,
    href: "/myrecipe",
  },
  {
    name: "Saved",
    activeIcon: <Archive size={iconSize} color={activeColor} weight="fill" />,
    inactiveIcon: <Archive size={iconSize} color={inactiveColor} />,
    href: "/saved",
  },
];
