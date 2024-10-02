import { useState } from "react";
import AnimatedWrapper from "../../molecules/wrappers/AnimatedWrapper";
import { AnimatePresence } from "framer-motion";

const UserMenu = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = (e,value) => setIsOpen((prev) => (value ? value : !prev));
  return (
    <div className="flex items-center ms-3">
      
        <button
          type="button"
          onClick={handleIsOpen}
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src={profile.image}
            alt="user photo"
          />
        </button>
      <AnimatePresence>
        {isOpen && (
          <AnimatedWrapper direction={"up"}>
            <div
              className="absolute right-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
              id="dropdown-user"
            >
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900">{profile.name}</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.email}
                </p>
              </div>
              <ul className="py-1">
                {profile.menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
