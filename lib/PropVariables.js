// tablolara verilen propları tek bir yerden rahat bir şekilde yönetebilmemiz için gerekli yapıyıs sunur
// tablodaki props değerleini tek bir yerden yönetmemizi sağlar

const tableProps = {
    columns: [],
    data: null,
    isLoading: false,
    setSidebarVisible: false,
    setSelectedRecord: null,
    setVisibleModalDelete: false,
    setVisibleModal: false,
    setIsUpdate: false,
    getFetchList: null
};

/**
 *
 * @param {Array} columns - tabloda gösterilecek olan sütunlar
 * @param {object} data - response sonucu dönene data
 * @param {boolean} isLoading - tablo verilerininn gelmesini beklerken gösterilecek durum
 * @param {(value: (((prevState: boolean) => boolean) | boolean)) => void} setIsUpdate -  seçilen kayıt update mi edilecek
 * @param {function} setVisibleModal - düzenleme modalı için
 * @param {(value: (((prevState: boolean) => boolean) | boolean)) => void} setSidebarVisible - detay sidebarı gösterir
 * @param {(value: unknown) => void} setSelectedRecord - seçilen satırı set eder
 * @param {function} setVisibleModalDelete - kayıt silme modalı açar
 * @param {function} getFetchList - listeyi çektiğimi fonksiyon paginate için gerekli
 *
 * @returns
 */

export const setTablePropsVariables = (columns = [], getFetchList = null, data = null, isLoading = false, setSidebarVisible = false, setSelectedRecord = null, setVisibleModalDelete = false, setVisibleModal = false, setIsUpdate = false) => {
    tableProps.columns = columns;
    tableProps.data = data;
    tableProps.isLoading = isLoading;
    tableProps.setSidebarVisible = setSidebarVisible;
    tableProps.setSelectedRecord = setSelectedRecord;
    tableProps.setVisibleModalDelete = setVisibleModalDelete;
    tableProps.setIsUpdate = setIsUpdate;
    tableProps.setVisibleModal = setVisibleModal;
    tableProps.getFetchList = getFetchList;
    return {...tableProps};
};

// KAYIT DETAYLARINININ MODALI İÇİN GEREKLİ PROPSLAR
const detailSidebarProps = {
    visible: false, setVisible: false, setSelectedRecord: null, isLoading: false
};

export const /**
 * The setDetailSidebarPropsVariables function is used to set the values of the detailSidebarProps object.
 *
 *
 * @param visible Set the visibility of the sidebar
 * @param setVisible Set the visibility of the sidebar
 * @param setSelectedRecord Set the selected record in the state of the parent component
 * @param isLoading Determine whether to show the loading spinner or notß
 *
 * @return An object with the following properties:
 *
 * @docauthor Trelent
 */
setDetailSidebarPropsVariables = (visible = false, setVisible = null, setSelectedRecord = null, isLoading = false) => {
    detailSidebarProps.visible = visible;
    detailSidebarProps.setVisible = setVisible;
    detailSidebarProps.setSelectedRecord = setSelectedRecord;
    detailSidebarProps.isLoading = isLoading;

    return {...detailSidebarProps};
};
