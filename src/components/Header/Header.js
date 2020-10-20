import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../Context/UserContext";

function Header({ open, setActiveModal }) {
  let context = useContext(UserContext);
  return (
    <header className="border-b-2 border-green-300 font-nunito py-3 shadow-md">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="w-36 h-12"
                  src="/img/conduit-logo-header-black-new.png"
                  alt="logo"
                />
              </Link>
              {/* <Link
                to="/"
                className="text-2xl font-bold  text-white ml-6 border-l-2 border-white pl-4"
              >
                Conduit
              </Link> */}
            </div>
            <div></div>
          </div>
          <div>
            {!context.user ? (
              <ul className="flex text-gray-900">
                <li>
                  <NavLink
                    className=" text-xl hover:text-green-400 tracking-wider"
                    activeClassName="border-b border-green-400"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="ml-6 text-xl  hover:text-green-400 tracking-wider"
                    activeClassName="border-b border-green-400"
                    to="/"
                    onClick={() => {
                      setActiveModal("signup");
                      open();
                    }}
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="ml-6 text-xl  hover:text-green-400 border border-gray-600 py-2 px-5 rounded tracking-wider"
                    activeClassName="border-b border-green-400"
                    to="/"
                    onClick={() => {
                      setActiveModal("login");
                      open();
                    }}
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            ) : (
              <>
                <ul className="flex text-gray-900">
                  {console.log(context.user)}
                  <div className=" text-ipl-blue tracking-wider">
                    <p>Welcome</p>
                    {context.user ? <p>{context.user.username}</p> : ""}
                  </div>
                  <li>
                    <NavLink
                      className="ml-6 text-xl hover:text-green-400 tracking-wider"
                      activeClassName="border-bborder-green-400"
                      to="/"
                      exact
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="ml-6 text-xl  hover:text-green-400 tracking-wider"
                      activeClassName="border-b border-green-400"
                      to="/"
                      exact
                      onClick={() => {
                        localStorage.clear();
                        context.setNotification(
                          "you have been successfully logged out"
                        );
                        context.setUser(null);
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
