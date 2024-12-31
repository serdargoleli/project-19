import Link from "next/link";
import React, { useRouter } from "next/router";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import MenuList from "@/static/data/MenuListNew.json";
import { useTranslation } from "react-i18next";
import { HiOutlineChartPie, HiOutlineUsers, HiOutlineWrench } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import CsButton from "@/components/Buttons/CsButton";
import { MdOutlineDevicesOther } from "react-icons/md";


const iconComponents = {
  "HiOutlineChartPie": HiOutlineChartPie,
  "HiOutlineUsers": HiOutlineUsers,
  "MdOutlineDevicesOther": MdOutlineDevicesOther,
  "HiOutlineWrench": HiOutlineWrench
};

const renderIcon = (iconName) => {
  const memoizedIcon = useMemo(() => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  }, [iconName]);  // iconName değişmedikçe aynı ikonu döner
  return memoizedIcon;
};


const Sidebar = ({ darkMode, sidebarToggle, isMobile, isMobileMenu, setIsMobileMenu }) => {
  const router = useRouter();
  const [menu, setMenu] = useState(MenuList);
  const { t } = useTranslation();
  const [openGroup, setOpenGroup] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const sidebarContentRef = useRef(null);

  useEffect(() => {
    setIsMobileMenu(false);
    setActiveMenu(isMenuItemActive(router.pathname));
  }, [router.pathname]);


  const isMenuItemActive = (href) => {
    return router.pathname === href;
  };


  return (// isMobile: 640 px altı olunca true olur
    // mobile-screen: mobil ekrana geçildiğinde
    // isMobileMenu: mobil menü toggle edildiğinde

    <aside id="logo-sidebar"
           className={`aside ${isMobile ? "mobil-screen" : ""} ${isMobileMenu ? "view-mobil-screen" : ""}`}>
      <div className={"close-button-box"}>
        <CsButton type="outlinePrimary" onClick={() => setIsMobileMenu(false)}>
          <IoCloseOutline size={24} />
        </CsButton>
      </div>
      <div className="flex gap-x-2 items-center p-6">

        <h2 className="text-2xl font-bold text-orange-500">  {sidebarToggle ? "VTL" : "VTL-Soft Digico"}</h2>
      </div>
      <div className="sidebar-container" ref={sidebarContentRef}>
        <h2 className="px-6 mt-6 mb-2 text-gray-4 menu-text-title">Menü</h2>
        {menu?.map((item, index) => (
          <Link prefetch={true} key={"sidebar-link" + item.id} href={item.href}
                className={`sidebar-menu-link ${isMenuItemActive(item.href) && "active-menu"}`}>
            <span className="menu-link-icon">{renderIcon(item.icon)}</span>
            <span className="menu-link-text">{t(item.label)}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default memo(Sidebar);
