// pages/404.js

import Link from "next/link";
import { Image } from "primereact/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";

const Custom404 = () => {
    const router = useRouter();
    const { setPageTitle } = usePageTitle();
    const [isAsPath, setIsAsPath] = useState(null);

    useEffect(() => {
        if (router.asPath) {
            setPageTitle("404 - Sayfa Bulunamadı");
            setIsAsPath(router.asPath.replace("/", ""));
        }
    }, [router.asPath]);

    return (
        <div className="grid grid-cols-12 place-content-center h-full" style={{ height: "calc(100vh - 120px)" }}>
            <div className="text-content w-full text-center col-span-4">
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-9xl font-bold">404</h1>
                    <p> Gitmek istediğiniz <b>{isAsPath}</b> adresi bulunamadı.</p>
                    <div className="btn-box flex justify-center mt-5">
                        <Link href="/" className="btn btn-primary w-max">Anasayfa</Link>
                    </div>
                </div>
            </div>
            <div className="image-box col-span-7">
                <Image src="/404.svg" alt="404 Not Found" />
            </div>
        </div>

    );
};

export default Custom404;
