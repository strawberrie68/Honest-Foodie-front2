import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { navigationIcons } from "./NavIconData";

const NavBar = () => {
  return (
    <>
      {/* Desktop Navigation (Left Side) */}
      <div className="bl-black-200 icons-center fixed left-0 top-0 hidden h-screen w-24 flex-col border-r bg-white pt-10 md:flex">
        <Link to="/">
          <img src={logo} alt="logo" className="h-20 w-auto p-5" />
        </Link>

        <div className="nav-link mt-16 p-2">
          {navigationIcons.map((icon) => (
            <NavLink key={icon.name} to={icon.href}>
              {({ isActive }) => (
                <div className="mb-6 flex flex-col items-center">
                  {isActive ? icon.activeIcon : icon.inactiveIcon}
                  <p
                    className={`nav-text pt-1 text-center text-xxs ${
                      isActive ? "text-black" : "text-neutral-400"
                    }`}
                  >
                    {icon.name}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Navigation (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white py-3 lg:hidden">
        {navigationIcons.map((icon) => (
          <NavLink
            key={icon.name}
            to={icon.href}
            className="flex flex-col items-center"
          >
            {({ isActive }) => (
              <>
                {isActive ? icon.activeIcon : icon.inactiveIcon}
                <p
                  className={`nav-text pt-1 text-center text-xxs ${
                    isActive ? "text-black" : "text-neutral-400"
                  }`}
                >
                  {icon.name}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default NavBar;
