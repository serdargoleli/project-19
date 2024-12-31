import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { InputNumber } from "primereact/inputnumber";
import { has, some, split } from "lodash";
import { queryObjectToQueryString, routerAddQuery } from "@/helpers/RouterHelpers";

/**
 * Sayfalama işleminde her şey routing query e bağlı olarak çalışıyor.
 * sayfa açıldığında query de page ve per_page varsa onları alıyoruz yoksa default olarak 1 ve 10 değerlerini atıyoruz.
 * sayfa değiştiğinde veya sayfa başına kayıt değiştiğinde router.push ile query değiştiriyoruz.
 * sayfa değiştiğinde veya sayfa başına kayıt değiştiğinde useEffect ile getList fonksiyonunu çalıştırıyoruz.
 * getList fonksiyonu fetchRequest fonksiyonunu çalıştırıyor.
 * fetchRequest fonksiyonu ise tablodaki verileri çekiyor.
 *
 * @param {object} paginate - Response ile gelen paginate objesi
 * @param {function} fetchRequest - tablodaki verileri çekmek için kullanılacak fonksiyon
 * @return {JSX.Element} - Sayfalama butonları
 * @constructor
 *
 *
 */
//  TODO: Burada optimizye gidilmesi gereli, table her render olduğunda veya dil değiştirildiğinde isteği tekrarlıyor.
const TablePaginate = ({ paginate, fetchRequest, t }) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [selectedPerPage, setSelectedPerPage] = useState(null); // default: perpageOptions[0
  const router = useRouter();
  const perpageOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 }
  ];
  const pageInputTooltip = t("pageInputTooltip");
  const [queryString, setQueryString] = useState(null);

  useEffect(() => {
    if (has(router.query, "page") && has(router.query, "per_page")) {
      setCurrentPage(Number(router.query.page));
      setSelectedPerPage(Number(router.query.per_page));
      setQueryString(queryObjectToQueryString(router.query, ["id"]));
    } else {
      // burada query ilk boş olarak gelşiyor urlde ekli olsa bile asPath ile full path geliyor ve full pati alıyoruz
      const fullURl = router.asPath;
      // burada fullpathi query kısmından  soru işareti (?) ile ayırıyoruz
      const splitPath = split(fullURl, "?");
      // daha sonra path ve query olarak iki index oluşuyor ve biz query kısmını alıyoruz yani 1.indexi
      const queryString = split(splitPath[1], "&");
      // daha sonra query stringi map ile key ve value olarak ayırıyoruz
      const parts = queryString.map((part) => {
        const [key, value] = split(part, "=");
        return { key, value };
      });
      // daha sonra keylerden page ve per_page varsa onları alıyoruz
      const keyExists = some(parts, item => item.key === "page" || item.key === "per_page");
      if (keyExists) {
        // burada da page ve per_page değerlerini set ediyoruz
        setCurrentPage(Number(parts.find(item => item.key === "page").value));
        setSelectedPerPage(Number(parts.find(item => item.key === "per_page").value));
      } else {
        routerAddQuery(router, { page: 1, per_page: 10 });
      }
    }


  }, [router.query]);

  useEffect(() => {
    if (queryString) {
      getList(queryString);
    }
  }, [queryString]);


  const getList = async (queryString) => {
    await fetchRequest(queryString);
  };

  const handlePageChange = async (type) => {
    let pageNumber = currentPage;
    if (type === "next" && currentPage < paginate?.total_pages) {
      pageNumber += 1;
    } else if (type === "prev" && currentPage > 1) {
      pageNumber -= 1;
    }

    if (pageNumber !== currentPage) {
      routerAddQuery(router, { page: pageNumber, per_page: selectedPerPage });
    }
  };

  const onPageInputKeyDown = (event) => {
    if (event.key === "Enter") {
      let pageNumber = Number(event.target.value);
      if (pageNumber > 0 && pageNumber <= paginate?.total_pages) {
        setCurrentPage(pageNumber);
        routerAddQuery(router, { page: pageNumber, per_page: selectedPerPage });
      }
    }
  };

  const changePerpage = (per) => {
    routerAddQuery(router, { page: 1, per_page: per });
  };

  /**
   * Bu fonksiyon, router'daki mevcut queryleri koruyarak yeni query parametreleri ekler.
   * @param {Object} queries - Yeni query parametreleri.
   */
  /* const routerAddQuery = ({ ...queries }) => {
       const newQuery = { ...router.query, ...queries };
       router.push({ query: newQuery });
   };*/


  return <div className="paginate">
    <div className="col-span-1 w-full">
      <div className="paginate-left">
        <span>{t("perPage") + ":"}</span>
        <Dropdown optionLabel={"label"} options={perpageOptions} value={selectedPerPage}
                  onChange={(e) => changePerpage(e.value)} className="p-0" />
      </div>
    </div>
    <div className="col-span-1 w-full">
      <div className="paginate-center">
        <span dangerouslySetInnerHTML={{ __html: t("totalRecordFound", { record: paginate?.total_count }) }} />
      </div>
    </div>
    <div className="col-span-1 w-full">
      <div className="paginate-right">
        <button className={`btn-change-page ${currentPage <= 1 ? "hidden" : " "}`}
                onClick={() => handlePageChange("prev")}><BsChevronLeft />
        </button>
        <div className="page-info">
          <InputNumber value={currentPage} min={1}
                       useGrouping={false} tooltip={pageInputTooltip}
                       tooltipOptions={{ position: "top" }}
                       onBlur={(e) => e.target.value = currentPage}
                       onKeyDown={(e) => onPageInputKeyDown(e)}
          />
          <span>/ {paginate?.total_pages}</span>
        </div>
        <button className={`btn-change-page ${currentPage >= paginate?.total_pages ? "hidden" : " "}`}
                onClick={() => handlePageChange("next")}><BsChevronRight />
        </button>
      </div>
    </div>
  </div>;
};

export default memo(TablePaginate);
