import { Divider } from "primereact/divider";
import React from "react";
import { LuInfo } from "react-icons/lu";
import { Tooltip } from "primereact/tooltip";

export const CardBox = ({ title = "", children, tooltipText = "", className, bodyClass }) => {

  return <div className={`chart-card h-full ${className}`}>
    <div className="chart-card-header">
      <Tooltip target=".custom-target-icon" className="w-64 text-sm z-[1000]" />
      <LuInfo
        size={24}
        tooltipOptions={{ autoDisplay: true }}
        className="custom-target-icon"
        data-pr-tooltip={tooltipText}
        data-pr-position="bottom" // Tooltip'un altta gösterilmesini sağlar
        data-pr-at="left bottom" // Tooltip'un altta gösterildiğinde, hedefin ortasına hizalar
        data-pr-my="left top+15" // Tooltip'un altta gösterildiğinde, Tooltip'un hedefin ortasına hizalanması ve hafif bir mesafe bırakılması sağlanır
        style={{ cursor: "pointer" }}
      />
      <h2 className="chart-title">{title}</h2>
    </div>
    <Divider className="divider-my-4" />
    <div className={`chart-card-content ${bodyClass}`}>
      {children}
    </div>
  </div>;
};