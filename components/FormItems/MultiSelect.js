import { MultiSelect as PrimeMultiSelect } from "primereact/multiselect";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useCallback } from "react";
import { debounce, has } from "lodash";

const MultiSelect = ({ ...props }) => {
  const title = props?.optionLabel; // kullanıcının göreceği dropdown üzerindeki isim
  const { t } = useTranslation();

  const optionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option[title]}</div>
      </div>
    );
  };

  // TODO: Burası filtreleme için kullanıclak alan
  const handleFilter = useCallback(
    debounce((val) => {
      const value = val.filter;
      if (value.length >= 3) {
        props?.getFetch(`search=${value}&per_page=10000`);
      } else {
        // Uzunluk 3'ten kısa olduğunda isteği kaldır
        props?.getFetch(); // Ya da başka bir uygun işlem yapabilirsiniz
      }
    }, 500),
    []
  );

  return <PrimeMultiSelect {...props}
                           onFilter={has(props, "getFetch") && handleFilter}
                           filterLocale={i18next.language}
                           emptyFilterMessage={t("no_record")}
                           emptyMessage={t("no_record")}
                           itemTemplate={props.itemTemplate ? props.itemTemplate : optionTemplate} filter
                           closeIcon={true} display="chip" />;
};

export default MultiSelect;
