import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Divider } from "primereact/divider";
import { RiMenu2Line } from "react-icons/ri";
import { usePageTitle } from "@/contexts/PageTitleContext";
import Head from "next/head";
import { IoMdLogOut } from "react-icons/io";

const Header = ({
                  darkMode,
                  toggleDarkMode,
                  setSidebarToggle,
                  sidebarToggle,
                  isMobile,
                  setIsMobileMenu,
                  t
                }) => {
  const { pageTitle } = usePageTitle();
  const router = useRouter();

  const logout = () => {
    Cookies.remove("login");
    router.push("/auth/login");

  };

  return (
    <>
      <Head>
        <title>{`${pageTitle} ~ VTL-Soft Digico`}</title>
      </Head>
      <nav className="nav">
        <div className="flex flex-row-reverse lg:flex-row items-center justify-between">
          <div className="flex items-center justify-start">
            <button className="btn-sidebar-toggle" onClick={() => {
              if (isMobile) {
                setIsMobileMenu(true);
              } else {
                setSidebarToggle(!sidebarToggle);
              }
            }}>
              {isMobile ? (<RiMenu2Line size={24} />) : (
                sidebarToggle ? <LuPanelLeftOpen size={24} /> : <LuPanelRightOpen size={24} />)
              }
            </button>
            <Divider layout="vertical" className={"hidden lg:block"} />
            <h1 className={"text-xl hidden lg:block"}>{pageTitle}</h1>
          </div>
          <span className="btn-logout " onClick={() => logout()}><IoMdLogOut size={24} /></span>

        </div>
      </nav>
    </>
  );
};
export default Header;
