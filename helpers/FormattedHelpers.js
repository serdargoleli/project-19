import { truncate } from "lodash";

/**
 * Bu fonksiyon, Array olarak değeri stringe çevirerek istenilen uzunlukta keserek return eder. 3 nokta ile bitirir
 * örn: [station1,station2,station3] => station1,station2,station3
 * @param {Array} filedDatas - array olarak gelen değer
 * @param {String} name - array içindeki key değeri
 * @param {Number} length - istenilen uzunluk
 * @return {string} result -
 */
export const arrayToObjectStringSplit = (filedDatas = [], name = "title", length = 30) => {
  const data = filedDatas?.map((item) => {
    return item[name];
  });
  let result = data?.join(",");

  if (result.length > length) {
    result = result.substring(0, length - 3) + "...";
  }
  return result;
};


export const stringSplit = (value, maxLength = 30) => {
  if (!value) {
    return;
  }
  return truncate(value, { length: maxLength, separator: "..." });
};
export const tokenDecode = (token) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

/**
 *  Bu fonksiyon, saat farkından bağımsız olarak oluşturulacak değerler için kullanılır
 *  örneğin doğum günleri, her yerde aynı tarih olduğu için saat farkna takılmaması için iso saat formatını 00 olarak gönderiyoruz
 *  gbu saat farkına takılmaması içinde  {@isoConvertDateObject()} fonksiyonunda type parametresi ile kontrol sağlıyoruz
 * @param isoDate
 * @return {string}
 */
export const dateConvertIso = (isoDate) => {
  if (!isoDate) {
    return;
  }
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ayı 2 haneli sayı olarak alın
  const day = String(date.getDate()).padStart(2, "0"); // Günü 2 haneli sayı olarak alın
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

/**
 * Bu fonksiyon, iso tarihli formatı date objesine çevirmek için kullanılır
 * ve tarayıcının saat dilimi farkını bularak gelen date objesine ekler
 * @param isoDate {string} - iso tarihli format
 * @param fixedDate {boolean} - true ise saat farkını eklemeyerek gelen date objesini return eder
 * @return {Date}
 */
export const isoConvertDateObject = (isoDate, fixedDate = false) => {
  const date = new Date(isoDate);
  const timeDifference = -date.getTimezoneOffset() / 60; // saat farkını bulur
  const timeDifferenceMillisecond = timeDifference * 60 * 60 * 1000; // saat farkını milisaniye cinsinden bulur
  const convertIso = new Date(isoDate);
  if (fixedDate) {
    return convertIso;
  }
  return new Date(convertIso.getTime() + timeDifferenceMillisecond);

};

/**
 *  Date objesini formatlayarak return eder. kulanım örneği tablo created_at(Oluşturulma Tarih alanı)
 * @param  {object} date - date objesi
 * @param  {boolean} noTime - true ise saat ve dakika bilgisini return etmez
 * @param language
 * @return {string} formattedDate
 */
export const dateFormatted = (date, noTime = false, language = "tr-TR") => {
  if (!date) {
    return;
  }
  const dateObject = new Date(date);
  const options = {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  };
  if (noTime) {
    delete options.hour;
    delete options.minute;
  }
  return dateObject.toLocaleDateString(language, options);
};

/**
 * Buraya strintg olarak saat ve dakika bilgisi girin
 * @param {string} hours
 * @param {string} minutes
 * @return {Date}
 */
export const createDateTimeFromHoursMinutes = (hours, minutes) => {
  const now = new Date(); // Geçerli tarihi alın
  now.setHours(hours); // Saati ayarlayın
  now.setMinutes(minutes); // Dakikayı ayarlayın
  now.setSeconds(0); // Saniyeyi sıfırlayın (isteğe bağlı)
  return now;
};

export const currencyFormatted = (value) => {
  if (value < 0 || !value) {
    value = 0;
  }
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value);
};