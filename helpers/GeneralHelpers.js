import {find} from "lodash";

/**
 *
 * @param {Array}  array - Arama yapacağımız dizi seti
 * @param {Object} predicate - arama yapacağımız key:value içeren obje ex: {"id": 2123123312}
 * @return {Object || Array || null} - bulunan obje veya dizi veya null
 */
export const foundField = (array, predicate) => {
    return find(array, predicate);
};

/**
 * @param {string} password - password
 * @type {function(string): string}
 *
 * @description
 *  Şifreyi gizlemek için kullanılır
 *
 *  @example
 *  passwordConvertEnabled("123456") => ("******")
 */
export const passwordConvertEnabled = (password) => {
    return password.replace(/./g, "*");
}