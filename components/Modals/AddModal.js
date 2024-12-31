import { Dialog } from "primereact/dialog";
import CsButton from "../Buttons/CsButton";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { FormikProvider } from "formik";
import { useTranslation } from "react-i18next";
import { dateFormatted, isoConvertDateObject } from "@/helpers/FormattedHelpers";
import { Divider } from "primereact/divider";


const AddModal = ({
                    visible,
                    setVisible,
                    children,
                    formik,
                    loading,
                    setIsUpdate,
                    isUpdate,
                    selectedRecord,
                    setSelectedRecord,
                    resetSelectedRecord = true,
                    className = ""

                  }) => {
  useEffect(() => {
    /* if (visible) {
       if (isUpdate && selectedRecord) {
         formik.setValues(selectedRecord);
       }
     } else if (resetSelectedRecord) {
       setIsUpdate(false);
       setSelectedRecord(null);
     }*/
    if (!visible) {
      formik.resetForm();
      formik.setErrors({});
    }
  }, [visible]);


  const { t } = useTranslation();
  return (
    <Dialog header={isUpdate ? t("update") : t("add")} visible={visible} onHide={() => setVisible(false)}
      // className={`min-w-[400px] max-w-[500px] lg:min-w-[300px] w-11/12 md:w-8/12 lg:w-500 ${className}`}
            className={`${className} add-modal`}
            position={"top"}>
      {isUpdate && selectedRecord &&
        <div className="updated-info">
          {t("lastUpdateDescription", { updatedDate: dateFormatted(isoConvertDateObject(selectedRecord?.updated_at)) })}
        </div>
      }
      {
        formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && Object.keys(formik.errors).map((key) => (
          <div className="error-message" key={key}>
            <strong>{t(key)}</strong> {":"}
            <span> {typeof formik.errors[key] !== "object" ? t(formik.errors[key]) : t("allFillFields")}</span>
          </div>
        ))
      }
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-3">
          {children}
          <div className="mt-5"></div>
          <div className="modal-custom-footer">
            <Button label={t("cancel")} type="button" className="btn" severity="danger" text
                    onClick={() => setVisible(false)} />
            <CsButton buttonType="submit" label={t("save")} onClick={formik.handleSubmit} type="save"
                      loading={loading} />
          </div>
        </form>
      </FormikProvider>
    </Dialog>);

};

export default AddModal;
