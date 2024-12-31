import { Dropdown as PrimeDropdown } from "primereact/dropdown";
import { has } from "lodash";
import { useTranslation } from "react-i18next";

/**
 * Dropdown bileşeni burada özelleştirilmiştır içerisine loading ve paginate tarzı işlemleri yönetebilmek için @serdargoleli
 * * Burada unutma: burada seçince berlilenen field'a tüm objeyi atıyor o yüzden formu gönderirken seçtiğin alandan sadece göndereceğini set et örnek için user sayfasının formSubmite bak
 * * @serdargoleli
 *
 * @param {Object} props - Bileşenin alabileceği prop özellikleri.
 * @param {string} props.name - Input Başlığı.
 * @param {string} props.value - formik formdata içeirisindeki atanacak değer belirtir
 * @param {functional} [props.onChange] - Dropdownda seçilen değerin formdataya atılması.
 * @param {string} [props.placeholder] - Dropdown'da görüntülenecek seçeneklerin etiket alanı.
 * @param {boolean} [props.autofocus=false] - Otomatik odaklanma durumu (varsayılan değer: false) sadece ilk form öğesii true olmalı.
 * @param {boolean} [props.autoComplete=false] - Otomatik doldurma durumu (varsayılan değer: false)
 * @param {string} [props.className="text"] - Formik valid oluşması durumunda  border ve  hata açıklamasını ekler
 * @param {Array} [props.options] - Dropdown için veri dizisi.
 * @param {string} [props.optionLabel] - Dropdown'da görüntülenecek seçeneklerin etiket alanı.
 */
const Dropdown = ({ ...props }) => {
  const title = props?.optionLabel; // kullanıcının göreceği dropdown üzerindeki isim
  const { t } = useTranslation();
  // burada loading, paginate yapabilmek için template oluşturuyoruz
  const optionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option[title]}</div>
      </div>
    );
  };
  return <PrimeDropdown {...props}
                        emptyMessage={t("no_record")}
                        itemTemplate={has(props, "itemTemplate") && props.itemTemplate != null ? props.itemTemplate : optionTemplate}
                        filter clearIcon emptyFilterMessage={t("no_record")} />;
};

export default Dropdown;
