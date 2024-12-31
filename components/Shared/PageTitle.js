import { InputText } from "primereact/inputtext";
import { BiSearch } from "react-icons/bi";
import CsButton from "../Buttons/CsButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { has } from "lodash";
import { queryObjectToQueryString, routerAddQuery, routerRemoveQuery } from "@/helpers/RouterHelpers";
import { useTranslation } from "react-i18next";

/**
 * Sayfa başlığı bileşeni.
 *
 * @param {string} title - Sayfa başlığı metni.
 * @param {boolean} search - Arama kutusu görüntülenip görüntülenmeyeceğini belirten boolean değer.
 * @param {boolean} addButton - "Yeni Ekle" düğmesinin görüntülenip görüntülenmeyeceğini belirten boolean değer.
 * @param {function} setVisible - "Yeni Ekle" düğmesine tıklanıldığında çağrılacak fonksiyon.
 * @param {function} getFetchSearch - Arama kutusuna yazılan değer değiştiğinde çağrılacak fonksiyon.
 * @param {children} children - Sayfa başlığı bileşeninin içeriği.
 * @param {string} moduleName - Modül adı.
 *
 * @returns {JSX.Element} - Sayfa başlığı bileşeni.
 */
const PageTitle = ({ title = "", search, addButton, setVisible, getFetchSearch, children, moduleName }) => {
  const [searchText, setSearchText] = useState(null); // burada null olarak belirliyoruz
  const router = useRouter();
  const [queryString, setQueryString] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (has(router.query, "search")) {
      setSearchText(router.query.search);
    } else {
      setSearchText(null);
    }
  }, [router.query]);

  useEffect(() => {
    if (searchText === null) return;
    const delayTimer = setTimeout(() => {
      if (typeof searchText === "string") {
        if (searchText.length >= 3) {
          routerAddQuery(router, { search: searchText, page: 1 });
        } else if (has(router.query, "search")) {
          routerRemoveQuery(router, ["search"]);
        }
        setQueryString(queryObjectToQueryString(router.query, ["id"]));
      }
    }, 1000);

    return () => {
      clearTimeout(delayTimer); // Süre dolduğunda çalışan zamanlayıcıyı temizle
    };
  }, [searchText]);


  const handleSearch = (e) => {
    const newSearchText = e.target.value.toString();
    setSearchText(newSearchText);
  };

  return (
    <div className="page-title">
      <h1 className="text-textLight dark:text-textDark text-2xl  font-medium lg:hidden">{title}</h1>
      <div className={`contents grid gap-x-4 ${search ? "col-span-2" : "col-span-1 place-content-end"}`}>
        {search &&
          <div className="p-input-icon-left">
            <BiSearch />
            <InputText placeholder={t("searchRecord")} value={searchText} onChange={handleSearch}
                       className="form-input"
                       tabIndex={0} tooltip={t("searchTooltip")}
                       tooltipOptions={{ position: "bottom" }} />
          </div>}
        <div className="contents-right w-full">
          {children}
          {addButton && <CsButton label={t("newRecordAdd")}
                                  onClick={() => setVisible(true)} />}
        </div>

      </div>
    </div>);
};

export default PageTitle;
