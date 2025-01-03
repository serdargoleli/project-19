import React, { memo, useEffect, useState } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/tr";
import cabins from "@/public/cabins.json";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import CsButton from "@/components/Buttons/CsButton";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FilterMatchMode } from "primereact/api";
import { statusTemplate } from "@/helpers/ElementHelpers";
import * as XLSX from "xlsx";

moment.locale("tr");

const CabinPage = () => {
  const { t } = useTranslation();
  const { setPageTitle } = usePageTitle();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");


  useEffect(() => {
    setPageTitle("cabin");
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <div className="py-3">
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ara..." />
        </div>

        <div className="flex gap-3 items-center">
          {/*<CsButton label="Yeni Cihaz Ekle" classname="w-full" onClick={() => setVisible(true)} />*/}
          <CsButton type="outlinePrimary" onClick={() => downloadListExcel()}>
            <IoCloudDownloadOutline size={18} />
          </CsButton>
        </div>
      </div>
    );
  };
  const header = renderHeader();

  const downloadListExcel = () => {
    const header = ["Kabin Numarası", "Mağaza Numarası", "Mağaza Adı", "Kabin Bilgisi", "Durum"];
    const rows = [header];
    cabins?.forEach(item => {
      const row = [
        item?.cabinId,
        item?.storeId,
        item?.storeName,
        item?.location,
        t(item?.status)
      ];
      rows.push(row);
    });
    const filename = "Kabin_Cihaz_Listesi";
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kabinler");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };
  return (
    <div className="page-content">
      <DataTable value={cabins} key={"id"} paginator rows={10} dataKey="serialNumber" filters={filters}
                 header={header} stripedRows filterDisplay="row"
                 globalFilterFields={["storeName", "location", "status"]}>
        <Column field="cabinId" header={t("cabinPage.cabinId")} sortable />
        <Column field="storeId" header={t("cabinPage.storeId")} sortable />
        <Column field="storeName" header={t("cabinPage.storeName")} sortable />
        <Column field="location" header={t("cabinPage.location")} sortable />
        <Column field="status" header={t("cabinPage.status")} sortable
                body={(rowdata) => statusTemplate(rowdata.status)} />
      </DataTable>
    </div>
  );
};
export default memo(CabinPage);
