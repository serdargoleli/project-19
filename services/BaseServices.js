// services/StationModel.js
import { axiosInstance } from "./ApiServices";

class BaseServices {
    // tüm listeleri getirir
    constructor(path) {
        this.path = `/${path}`;
    }

    /**
     * @returns {Promise} İstek sonucunda dönen verileri içeren bir Promise nesnesi.
     * @property {Array} data - İstek sonucunda dönen veriler.
     * @property {number} status - İstek durumu (örneğin: 200).
     * @property {string|null} code - İstek durum kodu (varsayılan olarak null olabilir).
     * @property {string|null} message - İstek durum mesajı (varsayılan olarak null olabilir).
     * @property {string|null} description - İstek durum açıklaması (varsayılan olarak null olabilir).
     * @property {string} version - İstek sonucunda dönen verilerin sürümü.
     * @property {Object|null} pagination
     */
    async getAllData(query = null, customPath = null) {
        try {
            let path = customPath ? customPath : this.path;
            if (query) {
                path = `${path}?${query}`;
            }
            const { data } = await axiosInstance().get(path);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    // tek kayıt detayını getirir
    /**
     *
     * @param {string} id
     * @returns {Promise} İstek sonucunda dönen verileri içeren bir Promise nesnesi.
     * @property {Array} data - İstek sonucunda dönen veriler.
     * @property {number} status - İstek durumu (örneğin: 200).
     * @property {string|null} code - İstek durum kodu (varsayılan olarak null olabilir).
     * @property {string|null} message - İstek durum mesajı (varsayılan olarak null olabilir).
     * @property {string|null} description - İstek durum açıklaması (varsayılan olarak null olabilir).
     * @property {string} version - İstek sonucunda dönen verilerin sürümü.
     * @property {Object|null} pagination
     */
    async details(id) {
        try {
            const { data } = await axiosInstance().get(`${this.path}/${id}`);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    /**
     * @returns {Promise} İstek sonucunda dönen verileri içeren bir Promise nesnesi.
     * @property {Array} data - İstek sonucunda dönen veriler.
     * @property {number} status - İstek durumu (örneğin: 200).
     * @property {string|null} code - İstek durum kodu (varsayılan olarak null olabilir).
     * @property {string|null} message - İstek durum mesajı (varsayılan olarak null olabilir).
     * @property {string|null} description - İstek durum açıklaması (varsayılan olarak null olabilir).
     * @property {string} version - İstek sonucunda dönen verilerin sürümü.
     * @property {Object|null} pagination
     */
    async create(formdata, customPath = null) {
        try {
            let path = customPath ? customPath : this.path;
            const { data } = await axiosInstance().post(path, formdata);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    /**
     * @returns {Promise} İstek sonucunda dönen verileri içeren bir Promise nesnesi.
     * @property {Array} data - İstek sonucunda dönen veriler.
     * @property {number} status - İstek durumu (örneğin: 200).
     * @property {string|null} code - İstek durum kodu (varsayılan olarak null olabilir).
     * @property {string|null} message - İstek durum mesajı (varsayılan olarak null olabilir).
     * @property {string|null} description - İstek durum açıklaması (varsayılan olarak null olabilir).
     * @property {string} version - İstek sonucunda dönen verilerin sürümü.
     * @property {Object|null} pagination
     */
    async update(id, formdata) {
        try {
            const { data } = await axiosInstance().put(`${this.path}/${id}`, formdata);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    async delete(id) {
        try {
            const response = await axiosInstance().delete(`${this.path}/${id}`);
            return response;
        } catch ({ response }) {
            return response?.data;
        }
    }
}

export default BaseServices;
