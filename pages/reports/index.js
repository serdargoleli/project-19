import React, { memo, useEffect } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/tr";
import dynamic from "next/dynamic";

moment.locale("tr");
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const dashboardData = {
  totalUsage: 1200,
  mostUsedCabin: {
    cabinId: "CAB001",
    usageCount: 150
  },
  averageSessionTime: "8m 30s",
  activeCabins: 18,
  totalCabins: 20,
  hourlyUsage: [50, 75, 120, 200, 300, 250, 180, 90, 60, 40, 30, 20],
  cabinUsage: [
    { cabinId: "CAB001", usageCount: 150 },
    { cabinId: "CAB002", usageCount: 120 },
    { cabinId: "CAB003", usageCount: 100 },
    { cabinId: "CAB004", usageCount: 90 },
    { cabinId: "CAB005", usageCount: 80 }
  ],
  genderUsage: {
    male: 700,
    female: 500
  },
  maintenanceRequired: 2,
  monthlyUsageTrend: [120, 150, 170, 180, 200, 220, 250, 300, 320, 280, 260, 240]
};

const ReportsPage = () => {
  const { t } = useTranslation();
  const { setPageTitle } = usePageTitle();
  const {
    totalUsage,
    mostUsedCabin,
    averageSessionTime,
    activeCabins,
    totalCabins,
    hourlyUsage,
    cabinUsage,
    genderUsage,
    maintenanceRequired,
    monthlyUsageTrend
  } =
    dashboardData;
  useEffect(() => {
    setPageTitle("reports");
  }, []);


  return (
    <div className="min-h-screen ">

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-base font-semibold text-gray-700">Toplam Kullanım</h2>
          <p className="text-xl font-bold text-blue-500">{totalUsage}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-base font-semibold text-gray-700">En Çok Kullanılan Kabin</h2>
          <p className="text-lg text-cyan-500">
            {mostUsedCabin.cabinId} -{" "}
            <span className="font-bold text-lg">{mostUsedCabin.usageCount} kez</span>
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-base font-semibold text-gray-700">Ortalama Kullanım Süresi</h2>
          <p className="text-lg font-bold text-amber-500">{averageSessionTime}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-base font-semibold text-gray-700">Aktif / Toplam Kabin</h2>
          <p className="">
            <span className="text-lg font-bold text-green-500">{activeCabins}</span> /{" "}
            <span className="text-lg font-bold">{totalCabins}</span>
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-base font-semibold text-gray-700">Bakım Gerektiren Kabinler</h2>
          <p className="text-lg font-bold text-red-500">{maintenanceRequired}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Saat Bazında Kullanım</h3>
          <Chart
            type="line"
            series={[{ name: "Kullanım", data: hourlyUsage }]}
            options={{
              chart: { id: "hourly-usage" },
              xaxis: { categories: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"] },
              title: { text: "Saat Bazında Kullanım", align: "center" }
            }}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Kabin Bazlı Kullanım</h3>
          <Chart
            type="bar"
            series={[{ name: "Kullanım", data: cabinUsage.map((item) => item.usageCount) }]}
            options={{
              chart: { id: "cabin-usage" },
              xaxis: { categories: cabinUsage.map((item) => item.cabinId) },
              title: { text: "Kabin Bazlı Kullanım", align: "center" }
            }}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Cinsiyete Göre Kullanım</h3>
          <Chart
            type="pie"
            series={[genderUsage.male, genderUsage.female]}
            options={{
              labels: ["Erkek", "Kadın"],
              title: { text: "Cinsiyete Göre Kullanım", align: "center" }
            }}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Aylık Kullanım Trendleri</h3>
          <Chart
            type="area"
            series={[{ name: "Kullanım", data: monthlyUsageTrend }]}
            options={{
              chart: { id: "monthly-trend" },
              xaxis: { categories: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"] },
              title: { text: "Aylık Kullanım Trendleri", align: "center" }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default memo(ReportsPage);
