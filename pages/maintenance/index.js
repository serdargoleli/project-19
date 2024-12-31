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
import * as XLSX from "xlsx";
import { ProgressBar } from "primereact/progressbar";

moment.locale("tr");

const equipmentListData = [
  {
    "name": "Yazıcı 1",
    "type": "Yazıcı",
    "status": "active",
    "serialNumber": "PRNT12345",
    "model": "HP LaserJet Pro MFP M428fdw",
    "location": "1. Kat - Ofis Bölümü",
    "lastMaintenanceDate": "2024-12-01",
    "nextMaintenanceDate": "2025-04-01"
  },
  {
    "name": "PC 1",
    "type": "PC",
    "status": "passive",
    "serialNumber": "PC98765",
    "model": "Dell OptiPlex 7090",
    "location": "3. Kat - IT Odası",
    "lastMaintenanceDate": "2024-10-15",
    "nextMaintenanceDate": "2025-04-15"
  },
  {
    "name": "Aydınlatma Sistemi 1",
    "type": "Aydınlatma Sistemi",
    "status": "passive",
    "serialNumber": "LIGHT56789",
    "model": "Philips Hue White",
    "location": "Zemin Kat - Giriş",
    "lastMaintenanceDate": "2024-11-10",
    "nextMaintenanceDate": "2025-05-10"
  },
  {
    "name": "HVAC 1",
    "type": "HVAC",
    "status": "active",
    "serialNumber": "HVAC12345",
    "model": "Daikin VRV IV",
    "location": "Çatı Katı",
    "lastMaintenanceDate": "2024-12-20",
    "nextMaintenanceDate": "2025-04-20"
  },
  {
    "name": "Güvenlik Kamerası 1",
    "type": "Güvenlik Sistemi",
    "status": "active",
    "serialNumber": "SEC98765",
    "model": "Hikvision DS-2CD2043G0-I",
    "location": "2. Kat - Koridor",
    "lastMaintenanceDate": "2024-11-01",
    "nextMaintenanceDate": "2025-04-01"
  },
  {
    "name": "UPS 1",
    "type": "UPS",
    "status": "passive",
    "serialNumber": "UPS56789",
    "model": "Eaton 9SX 3000i",
    "location": "Bodrum Kat - Elektrik Odası",
    "lastMaintenanceDate": "2024-09-15",
    "nextMaintenanceDate": "2025-03-15"
  },
  {
    "name": "Jeneratör 1",
    "type": "Jeneratör",
    "status": "active",
    "serialNumber": "GEN12345",
    "model": "Cummins C150D5",
    "location": "Bahçe",
    "lastMaintenanceDate": "2024-12-01",
    "nextMaintenanceDate": "2025-05-15"
  },
  {
    "name": "Enerji Ölçüm Cihazı 1",
    "type": "Enerji Ölçüm Donanımı",
    "status": "active",
    "serialNumber": "ENERGY12345",
    "model": "Schneider PM8000",
    "location": "1. Kat - Elektrik Panosu",
    "lastMaintenanceDate": "2024-12-10",
    "nextMaintenanceDate": "2025-06-10"
  },
  {
    "name": "Giriş Çıkış Denetim Sistemi 1",
    "type": "Giriş Çıkış Denetim Sistemi",
    "status": "active",
    "serialNumber": "ACCESS98765",
    "model": "ZKTeco F18",
    "location": "Zemin Kat - Ana Giriş",
    "lastMaintenanceDate": "2024-12-05",
    "nextMaintenanceDate": "2025-05-05"
  }
];

const MaintenancePage = () => {
  const { t } = useTranslation();
  const { setPageTitle } = usePageTitle();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  useEffect(() => {
    setPageTitle("maintenanceManagement");
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const downloadListExcel = () => {
    const header = ["Cihaz Adı", "Cihaz Tipi", "Seri Numarası", "Model", "Bulunduğu Kat", "Son Bakım Tarihi", "Gelecek Bakım Tarihi"];
    const rows = [header];
    equipmentListData?.forEach(item => {
      const row = [
        item?.name,
        item?.type,
        item?.serialNumber,
        item?.model,
        item?.location,
        item?.lastMaintenanceDate,
        item?.nextMaintenanceDate
      ];
      rows.push(row);
    });
    const filename = "Cihaz_bakım_Listesi";
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cihaz_Bakım");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between">
        <div className="py-3">
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ara..." />
        </div>

        <div className="flex gap-3 items-center">
          <CsButton type="outlinePrimary" onClick={() => downloadListExcel()}>
            <IoCloudDownloadOutline size={18} />
          </CsButton>
        </div>
      </div>
    );
  };
  const header = renderHeader();
  const calculateDaysLeft = (nextDate, lastDate) => {
    const next = moment(nextDate);
    const last = moment(lastDate);
    const totalDays = next.diff(last, "days");
    let remainingDays = next.diff(moment(), "days");

    if (remainingDays < 0) {
      remainingDays = 0;
    }

    return {
      totalDays,
      remainingDays,
      percentage: Math.max((remainingDays / totalDays) * 100, 0) // Yüzdelik hesaplama
    };
  };

  const renderProgressBar = (rowData) => {
    const { totalDays, remainingDays, percentage } = calculateDaysLeft(
      rowData.nextMaintenanceDate,
      rowData.lastMaintenanceDate
    );

    const color = remainingDays <= 7 ? "bg-danger" : "bg-success"; // Azalanlar kırmızı, diğerleri yeşil

    return (
      <div>
        <ProgressBar value={percentage.toFixed()} className={color} />
        <small>{remainingDays} gün kaldı</small>
      </div>
    );
  };

  return (
    <div>
      <DataTable stripedRows value={equipmentListData} key={"id"} paginator rows={10} dataKey="serialNumber"
                 filters={filters}
                 header={header}
                 filterDisplay="row" globalFilterFields={["name", "type", "serialNumber", "model", "location"]}>
        <Column field="name" header={t("maintenance.name")} sortable />
        <Column field="type" header={t("maintenance.type")} sortable />
        <Column field="serialNumber" header={t("maintenance.serialNumber")} sortable />
        <Column field="model" header={t("maintenance.model")} sortable />
        <Column field="location" header={t("maintenance.location")} sortable />
        <Column field="lastMaintenanceDate" header={t("maintenance.lastMaintenanceDate")}
                body={(rowdata) => moment(rowdata.lastMaintenanceDate).format("DD MMMM yyy")} sortable />
        <Column field="nextMaintenanceDate" header={t("maintenance.nextMaintenanceDate")}
                body={(rowdata) => moment(rowdata.nextMaintenanceDate).format("DD MMMM yyy")} sortable />
        <Column header="Bakım Durumu" body={renderProgressBar} />


      </DataTable>
    </div>
  );
};
export default memo(MaintenancePage);
