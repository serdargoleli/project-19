/**
 * Dosya yüklemesi için yardımcı fonksiyonlar
 * @param e
 * @returns
 */

export const fileUploadHelpers = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = {
                    src: reader.result,
                    type: file.type,
                    name: file.name,
                    size: file.size,
                };
                // Dosya içeriğini döndür
                resolve(fileContent);
            };
            reader.readAsDataURL(file);
        }
    });
};
