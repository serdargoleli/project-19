import { useFormik } from "formik";
import { validateField } from "./FormValidation";
import { isEmpty, isObject } from "lodash";


/**
 *
 * @param {object} initialValues - request body içerikleri
 * @param {function} submitForm - istek atılacak fonksiyon
 * @param {Array} optionalField - zorunlu olmayan alanları array olarak ekler
 * @returns
 *
 * @description
 * Burada özelleştirilmiş bir form validation fonksiyonu yazdık.
 *
 * @example
 *   const formik = useCustomFormik(initialValues, submitForm, ["sockets","social_medias.facebook",]);
 */
export const useCustomFormik = (initialValues, submitForm, optionalField = []) => {
  return useFormik({
    initialValues: initialValues,
    validate: (values) => {
      let errors = {};
      for (const fieldName in values) {
        const errorMessage = validateField(fieldName, values[fieldName], optionalField);
        if (errorMessage) {
          errors[fieldName] = errorMessage;
        }

        /**
         *  örn: socket:{
         *      0:{},
         *      1:{}
         *  }
         *  şeklinde geldiğinde validationa takılmaması için aşağıdaki kod blogunu yazdık
         *  önce ana obje içindiklere bakıyor hepsi boşmu diye heğer boşsa o fielddı siliyor
         *  burada 0:{}, 1:{} kısımlarını siliyor
         *                   *
         */
        if (isObject(errorMessage)) {
          if (Object.keys(errorMessage).length > 0) {
            Object.keys(errorMessage).forEach((key) => {
              if (typeof errorMessage[key] === "object" && Object.keys(errorMessage[key]).length === 0) {
                delete errorMessage[key];
              }
            });
          }
          /**
           * Burada da parent obje içindekiler silindiyse parent obje == {} ise prant objeyi sil [socket]
           */
          if (isEmpty(errors[fieldName])) {
            delete errors[fieldName];
          }

        }
      }
      return errors;
    },
    onSubmit: (data) => {
      submitForm(data);
    }
  });
};
