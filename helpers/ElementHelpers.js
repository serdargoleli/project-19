import { useTranslation } from "react-i18next";

export const statusTemplate = (status) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center">
      <span className={`badge ${status} `}>{t(status)}</span>
    </div>
  );
};