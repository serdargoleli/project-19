import {Image} from "primereact/image";

export const UploadImagePrevirew = ({children, preview, field}) => {
    return (
        <>
            <div className="mt-23">
                <label>Önizleme</label>
                <div className="bg-gray-700 bg-opacity-10 p-8 mb-4 rounded-lg relative">
                    <Image src={preview.src}/>
                    {children}
                </div>
            </div>
        </>
    )
}

