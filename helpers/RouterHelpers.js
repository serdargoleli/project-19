/**
 * Bu fonksiyon, router'daki mevcut queryleri koruyarak yeni query parametreleri ekler.
 * @param {Object} router - Next.js router nesnesi.
 * @param {Object} queries - Yeni query parametreleri.
 */
export const routerAddQuery = async (router = null, ...queries) => {
  const newQuery = { ...router.query, ...Object.assign({}, ...queries) };
  await router.push({ query: newQuery });
};

/**
 * Bu fonksiyon, router'daki mevcut queryleri koruyarak parametre olarak verilen queryleri kaldırır URL'den.
 * @param {Object} router - Next.js router nesnesi.
 * @param {Array} keysToRemove - Kaldırılacak query parametrelerinin isimleri.
 */
export const routerRemoveQuery = async (router = null, keysToRemove = []) => {
  const newQuery = { ...router.query };
  keysToRemove.map((key) => {
    delete newQuery[key];
  });
  await router.push({ query: newQuery });
};

export const removeQuery = async (router = null, keysToRemove = []) => {
  const newQuery = { ...router.query };
  keysToRemove.map((key) => {
    delete newQuery[key];
  });
  return newQuery;
};


/**
 * router.query objesini apiye istek atmak için kullanıyoruz
 *
 * @param {Object} routerQuery - routerda oluşan query objesini alarak stringe çevirir.
 * @param {string[]} excludedKeys - Eklenmemesi istenen key'leri içeren bir dizi.
 * @return {string}  - ex: page=1&per_page=10&search=ankara
 */
export const queryObjectToQueryString = (routerQuery, excludedKeys = []) => {
  return Object.keys(routerQuery)
    .filter(key => !excludedKeys.includes(key))
    .map(key => Array.isArray(routerQuery[key]) ? routerQuery[key].map(val => `${key}=${val}`).join("&") : `${key}=${routerQuery[key]}`)
    .join("&");
};
