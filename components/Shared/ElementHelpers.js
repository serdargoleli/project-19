import React from "react";
import { useTranslation } from "react-i18next";

const StatusTemplate = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center">
      <span className={`badge ${status}`}>{t(status)}</span>
    </div>
  );
};

export default StatusTemplate;
