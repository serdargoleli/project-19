import { Dialog } from "primereact/dialog";
import CsButton from "../Buttons/CsButton";
import { Button } from "primereact/button";
import { useState } from "react";
import { setErrorMessage, setSuccessMessage } from "@/helpers/MessagesHelpers";
import ToastAlert from "../Alert/Toast";
import { useTranslation } from "react-i18next";
import { queryObjectToQueryString } from "@/helpers/RouterHelpers";
import { useRouter } from "next/router";

/**
 * Silme işlemi için kullanılan modal bileşeni.
 * @param {boolean} visible - modalın aktif durumunu gösterirr
 * @param {function} setVisible - modalın aktif durumunu değiştirir
 * @param {string} id - seçilen kayıt bilgilerini tutar
 * @param {string} name - silinecek kayıdın hangisi olduğunu kullanıcıya göstermek için  UX/@serdargol3li
 * @param {Class} controller - silinecek kayıdın bağlı oldu controller
 * @param {function} getFetchList - silme işleminden sonra listeyi yenilemek için çağrılacak olan fonksiyon
 * @returns
 */

const DeleteModal = ({ visible, setVisible, id, name = "", controller, getFetchList }) => {
  const [isLoading, setisLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  const { t } = useTranslation();
  const router = useRouter();
  const deleteRecord = async () => {
    setisLoading(true);
    const response = await controller.delete(id);
    if (response.status === 204) {
      setMessages(setSuccessMessage(name, "Silme işlemi başarılı"));
      setVisible(false);
      getFetchList(queryObjectToQueryString(router.query));
    } else {
      setMessages(setErrorMessage(response?.message ? response?.message : "Hatalı işlem"));
    }
    setisLoading(false);
  };

  const deleteMessage = (name) => t("deleteMessage", { name: name });
  return (
    <>
      <Dialog header={t("delete")} visible={visible} onHide={() => setVisible(false)} style={{ width: "30vw" }}
              breakpoints={{ "960px": "75vw", "641px": "100vw" }}>
        <div className="pt-5 pb-8">
          <span dangerouslySetInnerHTML={{ __html: deleteMessage(name) }} />
        </div>
        <div className="modal-custom-footer mt-2">
          <Button label={t("cancel")} type="button" className="btn" severity="danger" outlined
                  onClick={() => setVisible(false)} />
          <CsButton buttonType="submit" label={t("yesDelete")} type="delete" loading={isLoading}
                    onClick={deleteRecord} />
        </div>
      </Dialog>
      <ToastAlert messages={messages} />
    </>
  );
};

export default DeleteModal;
