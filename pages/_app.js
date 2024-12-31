import "react-phone-input-2/lib/style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../assets/scss/global.scss";
import Layout from "@/components/Layout";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";


const App = ({ Component, pageProps }) => {
  const { t } = useTranslation();
  return <Layout t={t}>
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} t={t} />
    </I18nextProvider>
  </Layout>;
};

export default App;
