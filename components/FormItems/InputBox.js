import { Field, useFormikContext } from "formik";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Calendar } from "primereact/calendar";
import Dropdown from "./Dropdown";
import MultiSelect from "./MultiSelect";
import { Checkbox } from "primereact/checkbox";
import React, { useState } from "react";
import { fileUploadHelpers } from "@/helpers/UploadHelpers";
import { UploadImagePrevirew } from "@/components/Others/UploadImage";
import CsButton from "@/components/Buttons/CsButton";
import { LuTrash2 } from "react-icons/lu";
import { InputNumber } from "primereact/inputnumber";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";


/**
 *
 * @typedef {"text" | "email" | "tel" | "calendar" | "dropdown"| "password" | "multiselect" | "checkbox" | "textarea" | "number" | "file" | "numberInput" | "editor" | "number"} type
 */

/**
 * Projedeki tüm inputları buradan kullanırız dropdown ayrı bileşen oluşturulmuştur. @serdargoleli
 *
 * @param {Object} props - Bileşenin alabileceği prop özellikleri.
 * @param {string} props.label - Input Başlığı.
 * @param {string} props.inputName - formdata içeirisindeki atanacak değer belirtir
 * @param {boolean} [props.autofocus=false] - Otomatik odaklanma durumu (varsayılan değer: false) sadece ilk form öğesii true olmalı.
 * @param {type} [props.type="text"] - Giriş alanının türü (varsayılan değer: "text").
 * @param {Array} [props.dropdownOptions] - Dropdown için veri dizisi.
 * @param {string} [props.dropdownOptionLabel] - Dropdown'da görüntülenecek seçeneklerin etiket alanı.
 * @param {function} [props.dropdownItemTemplate] - Dropdown'da her item için özelleştirilmiş template.
 * @param {Object} [props.otherProps] - harici durumlar için kullanılacak propslar.
 * @param {Object} [props.formik] - resim upload edileceğinde gönder sadece
 * @param {boolean} [props.readonly] - input readonly olacaksa true gönder
 * @param {boolean} [props.className] - input class
 */


const InputBox = ({
                    className,
                    label,
                    inputName,
                    autofocus = false,
                    type = "text",
                    dropdownOptions = [],
                    dropdownOptionLabel = "",
                    dropdownItemTemplate = null,
                    formik = null,
                    readonly = false,
                    ...otherProps
                  }) => {

  const { setFieldValue } = useFormikContext();
  const [filePreview, setFilePreview] = useState(null);
  const [fileKey, setFilekey] = useState([]);
  const { t } = useTranslation();

  // yüklenen resmi formdatasına set eder ve önizleme yapar
  const handleFileUpload = async (event, field) => {
    const fileContent = await fileUploadHelpers(event);
    setFilePreview(fileContent);
    setFieldValue(field.name, event.target.files[0]);
  };

  const removeFile = (field) => {
    setFilePreview(null);
    setFieldValue(field.name, "");
    setFilekey({ [field.name]: Date.now() });
  };

  const renderInput = (field, meta) => {
    const propsInput = {
      name: field.name,
      value: field.value,
      onChange: field.onChange,
      placeholder: label,
      autoComplete: "on",
      autoFocus: autofocus,
      className: meta.touched && meta.error ? "input-error" : ""
    };
    const propsListSelect = {
      onChange: field.onChange,
      options: dropdownOptions,
      optionLabel: dropdownOptionLabel,
      itemTemplate: dropdownItemTemplate
    };

    switch (type) {
      case "file":
        return (
          <div className="relative">
            <label htmlFor={field.name} className="input-file ">
              {filePreview?.name ? filePreview?.name : "Dosya Seç"}
            </label>
            <input id={field.name} key={fileKey[field.name]} type="file" accept="image/*" name={field.name}
                   className={"hidden"}
                   onChange={(event) => handleFileUpload(event, field)} />
          </div>
        );
      case "textarea":
        return <InputTextarea {...propsInput} {...otherProps} />;
      case "checkbox":
        return <Checkbox {...propsInput} checked={field.value} inputId={field.name} />;
      case "password":
        return <Password {...propsInput} autoComplete="new-password" feedback={false} toggleMask
                         inputStyle={{ width: "100%" }} />;
      case "calendar":
        return <Calendar  {...propsInput} {...otherProps} dateFormat="dd/mm/yy" />;
      case "dropdown":
        const dropdownProps = { ...propsInput, ...propsListSelect, ...otherProps };
        return <Dropdown {...dropdownProps} />;
      case "multiselect":
        const multiselectProps = { ...propsInput, ...propsListSelect };
        return <MultiSelect {...multiselectProps} {...otherProps} maxSelectedLabels={2} />;
      case "tel":
        return <PhoneInput
          autoFormat={true}
          country="tr"
          enableAreaCodes={true}
          searchPlaceholder="Ülke Ara..."
          // searchNotFound="Ülke bulunamadı"
          enableSearch
          containerClass={"phone-input-container "}
          dropdownClass={"phone-input-dropdown"}
          inputClass={"p-inputtext"}
          copyNumbersOnly={true}
          disableSearchIcon
          {...propsInput}
          onChange={(inputText, phoneInfo, event, formattedValue) => {
            if (phoneInfo?.format?.length === formattedValue.length) {
              formik.setValues({ ...formik.values, [field.name]: inputText });
            } else {
              formik.setFieldError(inputName, t("validationError.invalidPhone"));
            }
          }}
        />;
      case "numberInput":
        return <InputNumber name={field.name}
                            value={field.value}
                            onValueChange={(e) => {
                              formik.setFieldValue(field.name, e.value);
                            }}

                            className={`${meta.touched && meta.error ? "input-error" : ""} w-full`}
                            {...otherProps} />;
      default:
        return <InputText  {...propsInput} type={type === "email" ? type : "text"}
                           keyfilter={type === "number" ? "int" : ""} disabled={readonly} {...otherProps} />;
    }
  };
  return (
    <div className={`input-box ${className ? className : ""} ${type === "checkbox" ? "checkbox-input" : ""}`}>
      <Field name={inputName}>
        {({ field, meta }) => (
          <>
            <label className="input-box-label" htmlFor={field.name}>{label}</label>
            {renderInput(field, meta)}
            {meta.touched && meta.error && <small className="text-red-500">{t(meta.error)}</small>}
            {filePreview &&
              <div className="mt-4">
                <UploadImagePrevirew preview={filePreview}>
                  <CsButton type="delete" classname="absolute  right-0"
                            onClick={() => removeFile(field)}>
                    <LuTrash2 /></CsButton>
                </UploadImagePrevirew>
              </div>
            }
          </>

        )}
      </Field>

    </div>
  );
};
export default InputBox;
