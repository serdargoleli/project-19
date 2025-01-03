import style from "@/assets/css/Login.module.css";
import { useState } from "react";
import { FormikProvider } from "formik";
import InputBox from "@/components/FormItems/InputBox";
import { useCustomFormik } from "@/helpers/FormikHelpers";
import CsButton from "@/components/Buttons/CsButton";
import { useRouter } from "next/router";
import AuthController from "@/controllers/AuthController";
import Cookies from "js-cookie";
import { setErrorMessage, setSuccessMessage } from "@/helpers/MessagesHelpers";
import Link from "next/link";
import ToastAlert from "@/components/Alert/Toast";
import { cloneDeep } from "lodash";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const initalPasswordVerify = {
  new_password: "",
  code: "",
  access_id: ""
};

const initalPasswordReset = {
  phone_number: "",
  company_key: "tripy"
};

/**
 *
 * @param {String} host - burası saas projesinde kullanılacak, subdomaini almak için
 * @return {JSX.Element}
 * @constructor
 */
const PasswordReset = ({ host }) => {
  const [loading, setLoading] = useState(false);
  const [newPasswordVerifyData, setNewPasswordVerifyData] = useState(initalPasswordVerify);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();
  const fetchPasswordReset = async (values) => {
    const formattedFormData = cloneDeep(values);
    formattedFormData.company_key = "tripy";
    setLoading(true);
    const response = await AuthController.passwordResetRequest(formattedFormData);
    if (response.status === 200) {
      formikPasswordVerify.setFieldValue("access_id", response?.data?.access_id);
      setMessage(setSuccessMessage("Şifre doğrulama kodu gönderildi."));
    } else {
      setMessage(setErrorMessage(response?.message));
    }
    setLoading(false);
  };

  const fetchPasswordResetVerify = async (values) => {
    setLoading(true);
    const response = await AuthController.passwordResetVerify(values);
    if (response.status === 201) {
      Cookies.set("accessToken", response?.data?.access_token, { expires: 1 });
      await router.push("/");
    } else {
      setMessage(setErrorMessage(response?.message));
    }
    setLoading(false);
  };

  /*  useEffect(() => {
      if (host) {
        const splitHost = host.split(".");
        let companyKey = "tripy";
        if (splitHost.length > 0) {
          if (splitHost[1] === "ev") {
            companyKey = splitHost[0];
          }
          formikPasswordReset.setFieldValue("company_key", companyKey);
        }
      }
    }, []);*/

  const formikPasswordReset = useCustomFormik(initalPasswordReset, fetchPasswordReset, ["company_key"]);
  const formikPasswordVerify = useCustomFormik(newPasswordVerifyData, fetchPasswordResetVerify);

  return (
    <div className={style.authPage}>
      <Head>
        <title>Şifremi Unuttum ~ VTL-StyleScan</title>
      </Head>
      <div className={style.authCard}>
        <h1 className={style.authCardTitle}>{t("forgot_password")}</h1>
        {
          formikPasswordVerify.values.access_id === "" ?
            (
              <FormikProvider value={formikPasswordReset}>
                <form onSubmit={formikPasswordReset.handleSubmit}>
                  <InputBox label={t("phone_number")} inputName={"phone_number"} type={"tel"}
                            formik={formikPasswordReset} />
                  <CsButton label={t("send_verify_code")} loading={loading} type="primary" buttonType="submit"
                            classname="w-full justify-center mt-3" />
                </form>

              </FormikProvider>
            ) : (
              <FormikProvider value={formikPasswordVerify}>
                <form onSubmit={formikPasswordVerify.handleSubmit}>
                  <InputBox label={t("verify_code")} inputName={"code"} type={"number"} maxLength={6} />
                  <InputBox label={t("new_password")} inputName={"new_password"} type={"password"} />

                  <div className="w-full h-[1px] bg-gray-700 my-4 rounded-lg"></div>
                  {/* <CsButton label="Yeniden Kod Gönder"
                            type="outlinePrimary" classname={"border-orange border-solid border w-full"}
                            buttonType={"button"} onClick={() => fetchPasswordReset} />*/}
                  <CsButton label={t("save_new_password")} loading={loading} type="primary" buttonType="submit"
                            classname="w-full justify-center mt-3" />
                </form>
              </FormikProvider>
            )
        }
        <div className="text-center mt-6">
          <Link href={"/auth/login"} className="text-link-item">{t("return_login_page")}</Link>
        </div>
      </div>
      <ToastAlert messages={message} />
    </div>
  );
};
export default PasswordReset;

export async function getServerSideProps({ req }) {
  const host = req.headers["host"]; // Örn. www.example.com
  return {
    props: { host }
  };
}