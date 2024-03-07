import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { navigationIcons } from "./NavIconData";

const NavBar = () => {
  return (
    <div className=" icons-center bl-black-200 flex h-full w-20 flex-col border pt-10">
      <img src={logo} alt="logo" className="h-20 w-auto p-5" />

      <div className="nav-link mt-16 p-2">
        {navigationIcons.map((icon) => (
          <NavLink key={icon.name} to={icon.href}>
            {({ isActive }) => (

              <div className="flex flex-col items-center	mb-6">
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
