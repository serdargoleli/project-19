import React, { useCallback, useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TablePaginate from "../Paginate/TablePaginate";
import { Menu } from "primereact/menu";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineSortAscending,
  AiOutlineSortDescending
} from "react-icons/ai";
import { dateFormatted, isoConvertDateObject } from "@/helpers/FormattedHelpers";
import { cloneDeep, has, isEqual } from "lodash";
import { useRouter } from "next/router";
import { routerAddQuery } from "@/helpers/RouterHelpers";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button } from "primereact/button";
import { IoIosArrowDown } from "react-icons/io";
import { PUBLIC_MODULE } from "@/utils/constants";
import { useTranslation } from "react-i18next";
import i18next from "i18next";


/**
 * @param data - tablo verileri
 * @param getFetchList - tablo verilerini çekmek için kullanılacak fonksiyon
 * @param isLoading - tablo verilerininn gelmesini beklerken gösterilecek durum
 * @param columns - tabloda gösterilecek olan sütunlar
 * @param setSelectedRecord - seçilen satırı set eder
 * @param setSidebarVisible - detay sidebarı gösterir
 * @param setVisibleModalDelete - kayıt silme modalı açar
 * @param setVisibleModal - düzenleme modalı için
 * @param setIsUpdate -  seçilen kayıt update mi edilecek
 * @param actionColItems -  tabloda gösterilen aksiyon butonunda listelenecek itemlar
 * @param isDetailButton -  Detay Butonu gösterilsin mii
 * @param isUpdateButton -  seçilen kayıt update mi edilecek
 * @param isDeleteButton -  seçilen kayıt silinecek mi
 * @param moduleName -  modül adı
 *
 * @param isCreatedField
 * @return {Element} - Tablo
 * @constructor
 */
const GeneralTable = ({
                        data,
                        getFetchList,
                        isLoading,
                        columns,
                        setSelectedRecord,
                        setSidebarVisible,
                        setVisibleModalDelete,
                        setVisibleModal,
                        setIsUpdate,
                        isDetailButton = true,
                        isUpdateButton = true,
                        isDeleteButton = true,
                        actionColItems = null,
                        moduleName,
                        isCreatedField = true
                      }) => {
  const [updatedCol, setUpdatedCol] = useState(columns);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();

  // eğer gelen kolan listesinde aksiyon yoksa eklesin
  useEffect(() => {
    let cols = cloneDeep(updatedCol);
    if (cols) {
      const isActionsField = cols.find((column) => column.field === "actions");
      const isCreatedAt = cols.find((column) => column.field === "created_at");
      if (!isCreatedAt && isCreatedField) {
        cols.push({
          field: "created_at",
          header: t("createdAt"),
          body: ((rowdata) => dateFormatted(isoConvertDateObject(rowdata.created_at), undefined, i18next.language))
        });
      }
      if (!isActionsField && isActionsPermissionAdd()) {
        cols.push({ field: "actions", header: t("transactions"), body: actionCol });
      }
      if (!isEqual(updatedCol, cols)) {
        setUpdatedCol(cols);
      }
    }
    setUpdatedCol(cols);
  }, [columns, t, i18next.language]);


  const actionCol = (rowData) => {
    const menuRight = useRef(null);
    const actionsListItems = [];
    if (isDetailButton && moduleName === PUBLIC_MODULE) {
      actionsListItems.push({
        label: t("detail"),
        icon: <AiOutlineEye />,
        command: () => {
          setSidebarVisible(true);
          setSelectedRecord(rowData);
        }
      });

    }
    if (isUpdateButton) {
      actionsListItems.push({
        label: t("edit"),
        icon: <AiOutlineEdit />,
        command: () => {
          setVisibleModal(true);
          setSelectedRecord(rowData);
          setIsUpdate(true);
        }
      });

    }
    if (isDeleteButton) {
      actionsListItems.push({
        label: t("delete"),
        icon: <AiOutlineDelete />,
        command: () => {
          setVisibleModalDelete(true);
          setSelectedRecord(rowData);
        }
      });
    }

    // pprops olarak gelen aksiyon butonu
    if (actionColItems) {
      actionsListItems.push({ separator: true });
      actionColItems.map((item) => {
        actionsListItems.push({ ...item, command: () => item.command(rowData) });
      });
    }

    return <>
      <Button className="p-3" outlined onClick={(event) => menuRight.current.toggle(event)}>
        <HiOutlineDotsVertical />
      </Button>
      <Menu model={actionsListItems} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
    </>;

  };

  const isActionsPermissionAdd = () => {
    return true;
    /*return hasPermission(moduleName, "update") || hasPermission(moduleName, "delete") || hasPermission(moduleName, "single");*/
  };

  /*const footer = () => {
    return <TablePaginate fetchRequest={getFetchList} paginate={data?.pagination} t={t}  />;
  };
*/

  const footer = useCallback(() => {
    if (!getFetchList) return false;
    return <TablePaginate fetchRequest={getFetchList} paginate={data?.pagination} t={t} />;
  }, [data?.pagination, getFetchList]);


  const dataSort = async (e) => {
    if (sortField === e.sortField) {
      // Aynı alan üzerinde tekrar tıklama yapıldıysa, sıralama düzenini tersine çevir
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      // Farklı bir alana tıklama yapıldıysa, sıralama düzenini her zaman 1 yap
      setSortOrder(1);
    }

    setSortField(e.sortField);
    await routerAddQuery(router, { sort_key: e.sortField, sort_direction: sortOrder === 1 ? "asc" : "desc" });
  };

  useEffect(() => {
    if (has(router.query, "sort_key") && has(router.query, "sort_direction")) {
      setSortField(router.query.sort_key);
      // setSortOrder(router.query.sort_direction === "asc" ? 1 : -1);
    }
  }, [router.query]);

  const getSortClass = (field) => {
    if (field === sortField) {
      return sortOrder === 1 ? "p-sortable-column-sorted-1" : "p-sortable-column-sorted--1";
    }
    return "";
  };

  const getSortIcon = (field) => {
    if (field === "actions") return;
    if (field === sortField) {
      return sortOrder === 1 ? <AiOutlineSortDescending size={24} /> : <AiOutlineSortAscending size={24} />;
    } else {
      return <IoIosArrowDown size={18} />;
    }

  };


  return <DataTable  loading={isLoading} value={data} scrollable selectionMode="single"
                    emptyMessage={t("no_record")} tableStyle={{ minWidth: "50rem" }}
                    rowClassName="table-row" onSort={(e) => dataSort(e)}>
    {updatedCol.map((column, i) => (
      <Column key={column.field} field={column.field} header={
        <button onClick={() => dataSort({ sortField: column.field })}
                className={`sort-button ${(column.field === "created_at" || column.field === "actions") && "w-full"}`}>
          {!column.sortable && (
            <>
              {t(column.header)}
              {getSortIcon(column.field)}
            </>
          )}
        </button>
      }
              body={column?.body}
              sortable={column.field !== "actions"}
              className={getSortClass(column.field)}
              headerClassName="table-header"
              bodyStyle={{
                width: column.width, // Sütun genişliği
                ...(column.field === "actions" && {
                  textAlign: "center"
                }),
                ...(column.field === "created_at" && {
                  textAlign: "center"
                })
              }}
              headerStyle={{
                ...(column.field === "created_at" && {
                  textAlign: "center"
                })
              }}
      />))}
  </DataTable>;

};

export default GeneralTable;