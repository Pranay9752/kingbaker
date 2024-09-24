import MenuNavbar from "../../atom/nav/MenuSidebar";
import NavSidebar from "../../atom/nav/sidebar";

export default function HeaderLayout({
  id,
  logoSrc,
  logoAlt,
  title,
  userProfile,
  sidebarItems,
  children,
}) {
  return (
    <>
      <MenuNavbar
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        title={title}
        userProfile={userProfile}
      />
      <NavSidebar id={id} menuItems={sidebarItems} />
      <div class="p-4 sm:ml-64">
        <div class=" mt-14 h-[100svh] hide-scrollbar">{children}</div>
      </div>
    </>
  );
}
