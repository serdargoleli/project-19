import { Sidebar } from "primereact/sidebar";
import Skeleton from "../Loading/Skeleton";
import { Image } from "primereact/image";
import { Badge } from "primereact/badge";
import { has } from "lodash";
import { routerRemoveQuery } from "@/helpers/RouterHelpers";
import { useRouter } from "next/router";
// children olarak dışarıdan alır iç yapısını
/**
 *
 * @param {*} param0
 * @returns
 */
// TODO: Burada detay çekeceğimizde fonksiyonu burada çağıracağı
const DetailSidebar = ({ visible, setVisible, position = "right", children, setSelectedRecord, isLoading }) => {
  const router = useRouter();
  return (
    <Sidebar visible={visible} position={position} onHide={() => {
      setVisible(false);
      setSelectedRecord(null);
      if (has(router.query, "id")) {
        routerRemoveQuery(router, ["id"]);
      }
    }}
    >
      {isLoading ? <Skeleton /> : children}
    </Sidebar>

  );
};

// Sidebar Başlık alanı
export const DetailSidebarHeader = ({ title, subtitle, logoSrc = null, badge = null }) => {
  return (<div className={`detail-sidebar-header ${logoSrc ? "flex items-center gap-x-3" : ""}`}>
      {logoSrc &&
        <div className="rounded-lg overflow-hidden">
          <Image src={/*logoSrc*/"https://picsum.photos/250/250"} width={100}
                 className="shadow-2xl" />
        </div>
      }
      <div>
        <h1 className="detail-sidebar-title ">{title}
          {badge && <Badge className={"ml-2"} value={badge} severity="success" />}
        </h1>
        <h2>{subtitle}  </h2>
      </div>
    </div>
  );
};

// Sidebar Content alanı
export const DetailSidebarContent = ({ children }) => {
  return <div className="detail-sidebar-content">{children}</div>;
};

// burası kutucuklara bölüp ayrı ayrı kategori ediyor DetailSidebarItem i children olarak gönderiyoruz
export const DetailSidebarBox = ({ children, className }) => {
  return <div className={`detail-sidebar-box ${className}`}>{children}</div>;
};

// burada item gösteriyoruz başlık ve başlığın karşılığı örn: eposta serdar.goleli@info.com
export const DetailSidebarItem = ({ title, subtitle, className, titleStyle }) => {
  return (<div className={`detail-sidebar-item ${className ? className : ""} `}>
    <span>{subtitle}</span>
    <h3 className={titleStyle}>{title}</h3>
  </div>);
};

export default DetailSidebar;
