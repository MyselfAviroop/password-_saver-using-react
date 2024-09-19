import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white[background:radial-gradient(125%_125%_at_50%_10%,#fff_10%,#63e_100%)] border-gray-200 bg-violet-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center w-full">
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white flex-1">
            PassOP
          </span>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open main menu"}</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div
          ref={menuRef}
          className={`md:flex md:w-auto ${isOpen ? "block" : "hidden"} transition-transform duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-violet-600 md:dark:bg-violet-600 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-900 md:p-0 dark:text-white md:dark:hover:text-violet-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-900 md:p-0 dark:text-white md:dark:hover:text-violet-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-900 md:p-0 dark:text-white md:dark:hover:text-violet-900 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
