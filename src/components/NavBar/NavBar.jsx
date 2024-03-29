import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { navigationIcons } from "./NavIconData";

const NavBar = () => {
  return (
    <div className="navbar-container h-16 xs:h-screen sticky xs:top-0 w-full  xs:w-20 border bl-black-200 xs:pt-10 icons-center flex xs:flex-col px-5 xs:px-0 bg-white align-middle items-center">
      <img
        src={logo}
        alt="logo"
        className="logo w-10 h-10 xs:h-20 xs:w-20 xs:p-5 hidden xs:block"
      />

      <div className="flex justify-between xs:flex-col nav-link xs:mt-16 p-2 w-full xs:w-20">
        {navigationIcons.map((icon) => (
          <NavLink key={icon.name} to={icon.href}>
            {({ isActive }) => (
              <div className="flex flex-col items-center	xs:mb-6 ">
                {isActive ? icon.activeIcon : icon.inactiveIcon}
                <p
                  className={`nav-text text-xxs pt-1 text-center ${
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
  );
};

export default NavBar;
