import { useMemo, useState } from "react";
import RaiseTicket from "../../components/admin/tickets/RaiseTicket";
import ModalWrapper from "../../molecules/wrappers/ModalWrapper";
import UserMenu from "../menus/UserMenu";

const MenuNavbar = ({
  toggleSidebar,
  logoSrc,
  logoAlt,
  title,
  userProfile,
  menuItems,
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const screenWidth = useMemo(() => window.innerWidth, [window.innerWidth]);

  return (
    <>


      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => toggleSidebar()}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img src={logoSrc} className="h-8 me-3" alt={logoAlt} />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                  {title}
                </span>
              </a>
            </div>
            <div className="flex items-center">


              <div onClick={() => setIsOpen(true)} className="rounded-full p-1 cursor-pointer hover:bg-black/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                </svg>

              </div>

              <UserMenu profile={userProfile} />
            </div>
          </div>
        </div>
      </nav>

      <ModalWrapper
        isOpen={isOpen}
        onClose={(e) =>
          setIsOpen(false)}
        isModal={screenWidth > 768 ? true : false}
      >
        <RaiseTicket onClose={() =>
          setIsOpen(false)} />
      </ModalWrapper>
    </>
  );
};

export default MenuNavbar;
