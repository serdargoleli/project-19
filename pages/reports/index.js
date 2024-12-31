import React, { memo, useEffect } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/tr";

moment.locale("tr");


const ReportsPage = () => {
  const { t } = useTranslation();
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("reports");
  }, []);


  return (
    <div>
      reports
    </div>
  );
};
export default memo(ReportsPage);
