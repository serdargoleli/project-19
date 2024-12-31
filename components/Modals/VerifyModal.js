import { useEffect, useState } from "react";
import AuthController from "@/controllers/AuthController";
import Cookies from "js-cookie";
import { setErrorMessage } from "@/helpers/MessagesHelpers";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import CsButton from "@/components/Buttons/CsButton";
import { Dialog } from "primereact/dialog";
import ToastAlert from "@/components/Alert/Toast";
import { useRouter } from "next/router";
import { tokenDecode } from "@/helpers/FormattedHelpers";
import { getAccessibleMenu } from "@/utils/permissionControl";


const initalVerifyCode = ["", "", "", "", "", ""];

const VerifyModal = ({
                       verifyModalVisible,
                       setVerifyModalVisible,
                       accessId,
                       getVerifyCode,
                       isRetryCodeSenButton = true,
                       timeout = 180
                     }) => {
  const [count, setCount] = useState(0);
  const [verificationCode, setVerificationCode] = useState(initalVerifyCode);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const inputRefs = [];
  const router = useRouter();

  useEffect(() => {
    if (verifyModalVisible) {
      const timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
        } else {
          setCount(count - 1);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      setCount(timeout);
    }
  }, [count, verifyModalVisible]);

  useEffect(() => {
    if (timeout !== 180) {
      setCount(timeout);
    }
  }, [timeout]);

  useEffect(() => {
    if (!verifyModalVisible) {
      setVerificationCode(initalVerifyCode);
    }
  }, [verifyModalVisible]);

  const handleKeyDown = (index, event) => {
    if (verificationCode[index] !== "") {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = event.target.value;
      setVerificationCode(newVerificationCode);
      if (index < 5) {
        inputRefs[index].focus();
      }
    } else if (event.key === "Backspace") {
      if (verificationCode[index] === "") {
        if (index > 0) {
          inputRefs[index - 1].focus();
        }
      } else {
        inputRefs[index].focus();

      }
    }
  };

  const getAccessToken = async (verifyCode) => {
    setMessage(null);
    setVerifyLoading(true);
    const response = await AuthController.authLoginValidation({
      "access_id": accessId,
      "code": verifyCode ? verifyCode : code
    });
    if (response.status === 201) {
      Cookies.set("accessToken", response?.data?.access_token, { expires: 1 });
      const { accessibleMenu } = await getAccessibleMenu(tokenDecode(response?.data?.access_token));
      if (accessibleMenu.length > 0) {
        await router.push(accessibleMenu[0].href);
      }
    } else {
      setMessage(setErrorMessage(response?.message));
    }
    setVerifyLoading(false);
  };

  const handleInputChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    if (value.match(/^[0-9]$/)) {
      if (index < 5 && value !== "") {
        inputRefs[index + 1].focus();
      }
      // Tüm inputlar doldurulduysa işlemi tamamla
      if (!newVerificationCode.includes("")) {
        const verifyCode = newVerificationCode.join("");
        setCode(verifyCode);
        getAccessToken(verifyCode);
      }
      setVerificationCode(newVerificationCode);

    } else if (value === "") {
      // newVerificationCode[index] = "";
      setVerificationCode(newVerificationCode);
      if (index > 0) {

        inputRefs[index - 1].focus();
      }
    }
    setVerificationCode(newVerificationCode);
  };
  return (
    <>
      <ToastAlert messages={message} />
      <Dialog header={"Doğrulama Kodu"} visible={verifyModalVisible}
              onHide={() => setVerifyModalVisible(false)}
              className={"verify-modal w-10/12 md:w-6/12 lg:w-3/12"} position={"center"}
              contentClassName={"pb-0"}>
        <p className={"text-center mb-5 text-sm"}>
          Lütfen telefonun numaranıza gönderilen 6 haneli doğrulama kodu giriniz.</p>
        <div className="flex justify-center items-center gap-x-1">
          {verificationCode.map((value, index) => {
            return (
              <div key={value + "-" + index}>
                <InputText
                  autoFocus={value === "" && index === 0}
                  key={index}
                  type="tel"
                  keyfilter="int"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(input) => (inputRefs[index] = input)}
                  maxLength="1"
                  className={"w-full text-center"}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              </div>
            );
          })}
        </div>
        {
          verifyLoading ? (
            <ProgressSpinner />
          ) : (

            <CsButton label={count !== 0 ? `Kalan Süre: ${count}` : "Kodu tekrar gönder"}
                      classname={`${count !== 0 ? "text-orange-500" : "text-white"} w-full mt-4`}
                      disabled={count !== 0}
                      onClick={() => getVerifyCode()}
                      isView={isRetryCodeSenButton}
            />
          )
        }
      </Dialog>

    </>
  );
};


export default VerifyModal;