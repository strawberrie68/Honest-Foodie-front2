import {
  House,
  MagnifyingGlass,
  Binoculars,
  Book,
  Archive,
} from "@phosphor-icons/react";

export const navigationIcons = [
  {
    name: "Home",
    activeIcon: <House size={24} color="#000000" weight="fill" />,
    inactiveIcon: <House size={24} color="#9E9E9E" />,
    href: "/",
  },
  {
    name: "Search",
    activeIcon: <MagnifyingGlass size={24} color="#000000" weight="fill" />,
    inactiveIcon: <MagnifyingGlass size={24} color="#9E9E9E" />,
    href: "/search",
  },
  {
    name: "Explore",
    activeIcon: <Binoculars size={24} color="#000000" weight="fill" />,
    inactiveIcon: <Binoculars size={24} color="#9E9E9E" />,
    href: "/explore",
  },
  {
    name: "My Recipes",
    activeIcon: <Book size={24} color="#000000" weight="fill" />,
    inactiveIcon: <Book size={24} color="#9E9E9E" />,
    href: "/myrecipe",
  },
  {
    name: "Saved",
    activeIcon: <Archive size={24} color="#000000" weight="fill" />,
    inactiveIcon: <Archive size={24} color="#9E9E9E" />,
    href: "/saved",
  },
];
