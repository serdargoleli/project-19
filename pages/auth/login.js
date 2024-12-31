import { useState } from "react";
import style from "@/assets/css/Login.module.css";
import ToastAlert from "@/components/Alert/Toast";
import { useCustomFormik } from "@/helpers/FormikHelpers";
import CsButton from "@/components/Buttons/CsButton";
import { FormikProvider } from "formik";
import InputBox from "@/components/FormItems/InputBox";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setErrorMessage } from "@/helpers/MessagesHelpers";


const formInitalData = {
  email: "vitalis@info.com",
  password: "12345678"
};

const Login = ({ t }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginHandler = async () => {
    setLoading(true)
    if (formik.values.email === "vitalis@info.com" && formik.values.password === "12345678") {
      Cookies.set("login", 1);
      await router.push("/");
    } else {
      setMessage(setErrorMessage("Kullanıcı Adı veya Şifre yanlış"));
    }

    setLoading(false);
  };

  const formik = useCustomFormik(formInitalData, loginHandler);


  return (
    <>
      <ToastAlert messages={message} />
      <div className={style.authPage}>
        <div className={style.authCard}>
          <h1 className={style.authCardTitle}>{t("login")}</h1>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} method="POST">
              <InputBox label={t("email")} inputName="email" type="email" className="mb-3" />
              <InputBox label={t("password")} inputName="password" type="password" className="mb-6" />
              <CsButton label={t("login")} loading={loading} type="primary" buttonType="submit"
                        classname="w-full justify-center mt-3" />

            </form>
          </FormikProvider>
        </div>

      </div>
    </>
  );
};

export default Login;


