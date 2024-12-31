import i18n from 'i18next';
const { t } = i18n;

/**
 *
 * @param {string} name -- Kaydedilen işlemin  name,title vs gösteririr kullanıcıya bildirimde neyi oluşturduğunu göstermek için
 * @param {string} title --
 * @param {string} detail --
 * @returns
 */
export const setSuccessMessage = (name = "" || null, title = "Başarılı", detail = "İşlem başarıyla tamamlandı.") => {
  return [{ type: "success", summary: `${name} ${title}`, detail: detail }];
};

/**
 *
 * @param {Object|string} errorDetail -- validaiona takılırsa obje olarak geliyor, hata mesakjı alırsa string geliyor
 * @returns
 */
export const setErrorMessage = (errorDetail) => {
  let messages = [];
  if (errorDetail === null || errorDetail === undefined) {
    return messages;
  }

  // burada objemi stringmi kontrolü yapıyoruz
  if (typeof errorDetail === "object") {
    // obje se keyleri dönüyoruz burda key: [] şeklinde geldiği için her key için ayrı bir
    // döngü açıp her mesajı ayrı ayrı ekliyoruz
    Object.keys(errorDetail).map((err) => {
      if (typeof Object.keys(errorDetail[err]) === "object") {
        Object.keys(errorDetail[err]).map((subErr) => {
          if (typeof errorDetail[err][subErr] == "object") {
            Object.keys(errorDetail[err][subErr]).map((fieldKeys) => {
              messages.push({
                type: "error",
                summary: `${Number(subErr) + 1}'inci ${t(fieldKeys)} Hata`,
                detail: errorDetail[err][subErr][fieldKeys]
              });
            });
          } else {
            errorDetail[err].forEach((errorMessage) => {
              messages.push({ type: "error", summary: `${t(err)} Hata`, detail: errorMessage });
            });
          }
        });
      }
    });
  } else if (typeof errorDetail === "string") {
    // eğer repsponse stirng olarak geldiyse direkt hatayı basıyoruz
    messages.push({ type: "error", summary: `Hata`, detail: errorDetail });
  }
  return messages;
};

