import React, { memo, useEffect, useState } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/tr";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import CsButton from "@/components/Buttons/CsButton";
import { IoCloudDownloadOutline } from "react-icons/io5";
import productsList from "@/public/products.json";
import { Image } from "primereact/image";
import * as XLSX from "xlsx";
moment.locale("tr");



const EquipmentPage = () => {
    const { t } = useTranslation();
    const { setPageTitle } = usePageTitle();
    const [initialTableData, setInitialTableData] = useState(productsList);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
      setPageTitle("products");
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
      const header = ["Ürün Adı", "Cinsiyet", "Kategori", "Açıklama", "Fiyat"];
      const rows = [header];
      initialTableData?.forEach(item => {
        const row = [
          item?.name,
          item?.gender,
          item?.category,
          item?.description,
          item?.price
        ];
        rows.push(row);
      });
      const filename = "Ürünler_Listesi";
      const ws = XLSX.utils.aoa_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Ürünler");
      XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    const imageBodyTemplate = (product) => {
      return <div className="w-12 h-12">
        <Image src={`${product.image}`} alt={product.image} />
      </div>;
    };
    return (
      <div className="page-content">
        <DataTable value={initialTableData} key={"id"} paginator rows={10} dataKey="serialNumber" filters={filters}
                   header={header} stripedRows filterDisplay="row"
                   globalFilterFields={["name", "category", "description"]}>
          <Column header={t("productsPage.image")} body={imageBodyTemplate}></Column>
          <Column field="name" header={t("productsPage.name")} sortable />
          <Column field="gender" header={t("productsPage.gender")} sortable />
          <Column field="category" header={t("productsPage.category")} sortable />
          <Column field="description" header={t("productsPage.description")} sortable />
          <Column field="price" header={t("productsPage.price")} sortable body={(rowdata) => `₺ ${rowdata.price}`} />
        </DataTable>
      </div>
    );
  }
;
export default memo(EquipmentPage);
