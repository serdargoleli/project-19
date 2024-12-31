const EMPTY_INPUT_VALUE = "Zorunlu alan lütfen doldurunuz";
const INVALID_EMAIL_INPUT_VALUE = "Geçersiz e-posta adresi.";
const INVALID_PASSWORD_INPUT_VALUE = "Şifre en az 6 karakter olmalıdır.";


/**
 *
 * @param {string} fieldName - form içindeki field adı
 * @param {any} value - form içindeki field değeri
 * @param {Array} isOptional - zorunlu olmayan fieldları array olarak ekler
 * @return {string} errorMessage - hata mesajı döndürür
 *
 * @description
 *  Burada özelleştirilmiş bir form validation fonksiyonu yazdık.
 *  eğer initalValue içinde array olan bir field varsa case:sockets altına ekleyin, eğer initalValue içinde obje olan bir field varsa case:social_medias altına ekleyin,
 *  switch/case yapısı içinde hazırlanmış validasyon var
 *
 *  @example
 *  örn: sockets:[{},{},{}]
 *  örn: social_medias:{facebook:"",twitter:""}
 *
 */
export const validateField = (fieldName, value, isOptional = []) => {
  let errorMessage = "";

  // value string bir değerise  boşlukları at
  if (typeof value === "string") {
    value = value.trim();
  }

  // isOptional içindeki fieldlar içinde . varsa isObjectField içine at
  let isObjectField = [];
  if (isOptional.includes(fieldName)) {
    return errorMessage;
  } else {
    isObjectField = isOptional.filter((item) => item.includes("."));
  }


  if ((value === "" || value === null || value === undefined || (Array.isArray(value) && value.length <= 0))) {
    errorMessage = EMPTY_INPUT_VALUE;
  } else {
    switch (fieldName) {
      case "email":
      case "support_email":
      case "unregistered_user_email":
        if (!isValidEmail(value)) {
          errorMessage = INVALID_EMAIL_INPUT_VALUE;
        }
        break;
      case "password":
        if (value.length < 6 || value.length > 100) {
          errorMessage = INVALID_PASSWORD_INPUT_VALUE;
        }
        break;
      case "car_plate":
        if (value.length < 5) {
          errorMessage = INVALID_CAR_PLATE_INPUT_VALUE;
        }
        break;
      // buraya initalvalues içindeki arrayleri
      case "sockets": // buraya initalvalues içindeki arrayleri
      case "roles": // buraya initalvalues içindeki arrayleri
        if (Array.isArray(value) && value.length > 0) {
          errorMessage = {};
          value.forEach((item, mainIndex) => {
            errorMessage[mainIndex] = {}; // Her bir mainIndex için boş bir nesne oluşturun
            Object.keys(item).map((subItem) => {
              //  array içindeki field boş ise
              if (item[subItem] === null || item[subItem] === "") {
                errorMessage[mainIndex][subItem] = EMPTY_INPUT_VALUE;
              }
            });
          });
        }
        break;
      // buraya initalvalues içindeki objeleri
      case "social_medias":
      case "texts": // buraya initalvalues içindeki objeleri
        errorMessage = {};
        Object.keys(value).map((item, index) => {
          const splitItem = isObjectField.map(item => item.split("."));
          if (!splitItem.some(opt => opt[1] === item) && (value[item] === null || value[item] === "")) {
            errorMessage[item] = EMPTY_INPUT_VALUE;
          }
        });
        break;
      case "description":
        if (value.length > 255) {
          errorMessage = "validationError.maxLength255";
        }
        break;
    }
  }
  return errorMessage;
};

const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,50}$/i;
  return emailRegex.test(email);
};
