class BaseController {
    constructor(model) {
        this.model = model;
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
    async list(query = null, customPath = null) {
        try {
            const data = await this.model.getAllData(query, customPath);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    async details(id) {
        try {
            return await this.model.details(id);
        } catch ({ response }) {
            return response?.data;
        }
    }

    /**
     *
     * @param {*} formdata
     * @returns
     */
    async create(formdata, customPath = null) {
        try {
            const data = await this.model.create(formdata,customPath);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    async update(id, formdata) {
        try {
            const data = await this.model.update(id, formdata);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }

    async delete(id) {
        try {
            const data = await this.model.delete(id);
            return data;
        } catch ({ response }) {
            return response?.data;
        }
    }
}

export default BaseController;
