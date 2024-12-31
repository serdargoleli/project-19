// contexts/PageTitleContext.js
import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

const PageTitleContext = createContext();

export const usePageTitle = () => {
  return useContext(PageTitleContext);
};

export const PageTitleProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");
  const { t } = useTranslation();

  const translatedPageTitle = t(pageTitle);

  return (
    <PageTitleContext.Provider value={{ pageTitle: translatedPageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};
