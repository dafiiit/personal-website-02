import React from 'react';
    import { NavLink } from 'react-router-dom';

    const MenuBar: React.FC = () => {
      return (
        <nav className="fixed top-0 w-full z-10 border-b-2 border-[#efb314]">
          <div className="container mx-auto flex justify-center space-x-6 p-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[#efb314] hover:text-white px-3 py-2 rounded-md font-medium ${
                  isActive ? 'text-xl' : 'text-sm'
                }`
              }
            >
              About Me
            </NavLink>
            <NavLink
              to="/highlights"
              className={({ isActive }) =>
                `text-[#efb314] hover:text-white px-3 py-2 rounded-md font-medium ${
                  isActive ? 'text-xl' : 'text-sm'
                }`
              }
            >
              Highlights
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `text-[#efb314] hover:text-white px-3 py-2 rounded-md font-medium ${
                  isActive ? 'text-xl' : 'text-sm'
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-[#efb314] hover:text-white px-3 py-2 rounded-md font-medium ${
                  isActive ? 'text-xl' : 'text-sm'
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </nav>
      );
    };

    export default MenuBar;
