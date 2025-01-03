import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { navigationIcons } from "./NavIconData";

const NavBar = () => {
  return (
    <>
      {/* Desktop Navigation (Left Side) */}
      <nav
        className="bl-black-200 fixed left-0 top-0 hidden h-screen w-24 flex-col items-center border-r bg-white pt-10 md:flex"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="Go to homepage">
          <img
            src={logo}
            alt="honest foodie logo"
            className="h-20 w-20 p-5"
            loading="lazy"
          />
        </Link>

        <div className="nav-link mt-16 p-2">
          {navigationIcons.map((icon) => (
            <NavLink key={icon.name} to={icon.href} aria-label={icon.name}>
              {({ isActive }) => (
                <div className="mb-6 flex flex-col items-center">
                  {isActive ? icon.activeIcon : icon.inactiveIcon}
                  <p
                    className={`nav-text pt-1 text-center text-xxs ${
                      isActive ? "text-black" : "text-neutral-500"
                    }`}
                  >
                    {icon.name}
                  </p>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation (Bottom) */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white py-3 md:hidden"
        aria-label="Mobile navigation"
      >
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
                    isActive ? "text-black" : "text-neutral-500"
                  }`}
                >
                  {icon.name}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default NavBar;
