import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import React from "react";
import { Tooltip } from "primereact/tooltip";
import moment from "moment/moment";
import { Divider } from "primereact/divider";


export const DashboardCard = ({ title, value, isArrow = false, subValue = null, children, tooltipKey = "" }) => {
  const ReturnArrow = () => {
    if (isArrow) {
      return subValue?.rate > 0 ? <FaArrowTrendUp className="positive" /> : <FaArrowTrendDown className="negative" />;
    }
  };
  const currentMonth = moment().format("MMMM");
  const lastMonth = moment().subtract(1, "months").format("MMMM");

  return (
    <div className="dashboard-card">
      {
        subValue &&
        <Tooltip target={`.stock-${tooltipKey}`} position="top">
          <h2 className="mb-2">Günlük Ortalama Değerler</h2>
          <div>{lastMonth}: {subValue.lastAverageDailyValue} </div>
          <div>{currentMonth} : {subValue.currentAverageDailyValue} </div>
          <Divider />
          <h2 className="mb-2">Ayların <b>{subValue.dayOfMonth}.</b> Gününe Göre Karşılaştırılması</h2>
          <div>{lastMonth}: {subValue.lastMonthValue} </div>
          <div>{currentMonth} : {subValue.currentMonthValue} </div>
          <Divider />
          <div>Gün: {subValue.dayOfMonth}</div>
          <div>Oran: {"%"}{subValue.rate} </div>
        </Tooltip>
      }

      <h5 className="dashboard-card-title">{title}</h5>
      <div className="flex justify-start items-center gap-x-3">
        <span className="total-value">{value}</span>
        {
          subValue &&
          <span
            className={`stock cursor-pointer stock-${tooltipKey} ${subValue?.rate > 0 ? "text-green-500" : "text-red-500"}`}>
          {ReturnArrow()}
            {"%"} {subValue.rate}
        </span>
        }
      </div>
      <div className="subtitle">
        {children}
      </div>
    </div>
  );
};