import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ScrollTop } from "primereact/scrolltop";
import { BsChevronUp } from "react-icons/bs";
import { PageTitleProvider } from "@/contexts/PageTitleContext";
import i18next from "i18next";
import { addLocale } from "primereact/api";

const updateDarkMode = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
  Cookies.set("dark", isDark, { expires: 30 });
};

const Layout = ({ children, t }) => {
  /* VARIABLES */
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(null);
  const router = useRouter();

  // Sayfa yüklendiğinde dark modun durumunu kontrol et
  useEffect(() => {
    const storedDarkMode = Cookies.get("dark");
    const selectedLang = Cookies.get("lang");
    if (storedDarkMode !== undefined) {
      const isDark = JSON.parse(storedDarkMode);
      setDarkMode(isDark);
      updateDarkMode(isDark);
    }
    if (selectedLang === undefined) {
      Cookies.set("lang", "tr", { expires: 30 });
    } else {
      i18next.changeLanguage(selectedLang);
    }
  }, []);

  addLocale(i18next.language, {
    firstDayOfWeek: t("calendarLocaleOptions.firstDayOfWeek"),
    dayNames: t("calendarLocaleOptions.dayNames", { returnObjects: true }),
    dayNamesShort: t("calendarLocaleOptions.dayNamesShort", { returnObjects: true }),
    dayNamesMin: t("calendarLocaleOptions.dayNamesMin", { returnObjects: true }),
    monthNames: t("calendarLocaleOptions.monthNames", { returnObjects: true }),
    monthNamesShort: t("calendarLocaleOptions.monthNamesShort", { returnObjects: true }),
    today: t("calendarLocaleOptions.today"),
    clear: t("calendarLocaleOptions.clear"),
    emptyMessage: t("no_record"),
    emptyFilterMessage: t("no_record")
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenu(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Dark modu açma/kapatma işlemi
  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    updateDarkMode(isDark);
  };

  if (router.pathname === "/auth/login" || router.pathname === "/auth/password-reset") {
    return <>{children}</>;
  }

  return (
    <PageTitleProvider>
      <div
        className={`${sidebarToggle && !isMobile ? "close-sidebar " : " "} flex justify-between w-full h-full relative`}>
        <Sidebar sidebarToggle={sidebarToggle} darkMode={darkMode} isMobile={isMobile}
                 isMobileMenu={isMobileMenu} setIsMobileMenu={setIsMobileMenu} />
        <main className={`main-content  ${isMobile ? "sidebar-closed" : ""}`}>
          <Header darkMode={darkMode} setSidebarToggle={setSidebarToggle} sidebarToggle={sidebarToggle}
                  toggleDarkMode={toggleDarkMode} isMobile={isMobile} setIsMobileMenu={setIsMobileMenu}
                  isMobileMenu={isMobileMenu} t={t} />
          <div className="px-5">
            {children}
          </div>
          <ScrollTop target="parent" threshold={70} className="scroll-top" icon={<BsChevronUp />} />
        </main>
      </div>
    </PageTitleProvider>
  );
};

export default Layout;
