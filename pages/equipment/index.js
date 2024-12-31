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
import StatusTemplate from "@/components/Shared/ElementHelpers";
import * as XLSX from "xlsx";
import { IoCloudDownloadOutline } from "react-icons/io5";
import AddModal from "@/components/Modals/AddModal";

import { useCustomFormik } from "@/helpers/FormikHelpers";
import InputBox from "@/components/FormItems/InputBox";
import { cloneDeep } from "lodash";
import ToastAlert from "@/components/Alert/Toast";
import { setSuccessMessage } from "@/helpers/MessagesHelpers";

moment.locale("tr");

const equipmentListData = [
  {
    "name": "Yazıcı 1",
    "type": "Yazıcı",
    "status": "active",
    "serialNumber": "PRNT12345",
    "model": "HP LaserJet Pro MFP M428fdw",
    "location": "1. Kat - Ofis Bölümü"
  },
  {
    "name": "PC 1",
    "type": "PC",
    "status": "passive",
    "serialNumber": "PC98765",
    "model": "Dell OptiPlex 7090",
    "location": "3. Kat - IT Odası"
  },
  {
    "name": "Aydınlatma Sistemi 1",
    "type": "Aydınlatma Sistemi",
    "status": "passive",
    "serialNumber": "LIGHT56789",
    "model": "Philips Hue White",
    "location": "Zemin Kat - Giriş"
  },
  {
    "name": "HVAC 1",
    "type": "HVAC",
    "status": "active",
    "serialNumber": "HVAC12345",
    "model": "Daikin VRV IV",
    "location": "Çatı Katı"
  },
  {
    "name": "Güvenlik Kamerası 1",
    "type": "Güvenlik Sistemi",
    "status": "active",
    "serialNumber": "SEC98765",
    "model": "Hikvision DS-2CD2043G0-I",
    "location": "2. Kat - Koridor"
  },
  {
    "name": "UPS 1",
    "type": "UPS",
    "status": "passive",
    "serialNumber": "UPS56789",
    "model": "Eaton 9SX 3000i",
    "location": "Bodrum Kat - Elektrik Odası"
  },
  {
    "name": "Jeneratör 1",
    "type": "Jeneratör",
    "status": "active",
    "serialNumber": "GEN12345",
    "model": "Cummins C150D5",
    "location": "Bahçe"
  },
  {
    "name": "Enerji Ölçüm Cihazı 1",
    "type": "Enerji Ölçüm Donanımı",
    "status": "active",
    "serialNumber": "ENERGY12345",
    "model": "Schneider PM8000",
    "location": "1. Kat - Elektrik Panosu"
  },
  {
    "name": "Giriş Çıkış Denetim Sistemi 1",
    "type": "Giriş Çıkış Denetim Sistemi",
    "status": "active",
    "serialNumber": "ACCESS98765",
    "model": "ZKTeco F18",
    "location": "Zemin Kat - Ana Giriş"
  }
];

const initalFormData = {
  name: "",
  type: "",
  serialNumber: "",
  model: "",
  location: "",
  status: "active"
};

const EquipmentPage = () => {
    const { t } = useTranslation();
    const { setPageTitle } = usePageTitle();
    const [initialTableData, setInitialTableData] = useState(equipmentListData);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    useEffect(() => {
      setPageTitle("equipmentManagement");
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
            <CsButton label="Yeni Cihaz Ekle" classname="w-full" onClick={() => setVisible(true)} />
            <CsButton type="outlinePrimary" onClick={() => downloadListExcel()}>
              <IoCloudDownloadOutline size={18} />
            </CsButton>
          </div>
        </div>
      );
    };
    const header = renderHeader();

    const downloadListExcel = () => {
      const header = ["Cihaz Adı", "Cihaz Tipi", "Seri Numarası", "Model", "Bulunduğu Kat"];
      const rows = [header];
      initialTableData?.forEach(item => {
        const row = [
          item?.name,
          item?.type,
          item?.serialNumber,
          item?.model,
          item?.location,
          t(item?.status)
        ];
        rows.push(row);
      });
      const filename = "Cihaz_Listesi";
      const ws = XLSX.utils.aoa_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Cihazlar");
      XLSX.writeFile(wb, `${filename}.xlsx`);
    };

    const formHandler = async (values) => {
      setLoading(true);
      const cloneTableData = await cloneDeep(initialTableData);
      cloneTableData.push(values);
      setInitialTableData(cloneTableData);
      setVisible(false);
      setLoading(false);
      setMessage(setSuccessMessage("Kayıt işlemi başarılı"));
    };

    const formik = useCustomFormik(initalFormData, formHandler);


    return (
      <div className="page-content">
        <DataTable value={initialTableData} key={"id"} paginator rows={10} dataKey="serialNumber" filters={filters}
                   header={header} stripedRows
                   filterDisplay="row" globalFilterFields={["name", "type", "serialNumber", "model", "location"]}>
          <Column field="name" header={t("equipment.name")} sortable />
          <Column field="type" header={t("equipment.type")} sortable />
          <Column field="serialNumber" header={t("equipment.serialNumber")} sortable />
          <Column field="model" header={t("equipment.model")} sortable />
          <Column field="location" header={t("equipment.location")} sortable />
          <Column
            field="status"
            header={t("status")}
            body={(rowData) => <StatusTemplate status={rowData.status} />}
          />
        </DataTable>
        <AddModal isUpdate={false} visible={visible} setVisible={setVisible} formik={formik}>
          <InputBox label="Cihaz Adı" inputName="name" />
          <InputBox label="Cihaz Tipi" inputName="type" />
          <InputBox label="Seri Numarası" inputName="serialNumber" />
          <InputBox label="Cihaz Modeli" inputName="model" />
          <InputBox label="Bulunduğu Yer" inputName="location" />
        </AddModal>
        <ToastAlert messages={message} />
      </div>
    );
  }
;
export default memo(EquipmentPage);
