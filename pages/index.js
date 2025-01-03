"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCustomFormik } from "@/helpers/FormikHelpers";
import { FormikProvider } from "formik";
import InputBox from "@/components/FormItems/InputBox";
import HumanModel from "@/components/Others/HumanModel";
import CsButton from "@/components/Buttons/CsButton";
import { ProgressSpinner } from "primereact/progressspinner";
import productsList from "@/public/products.json";
import ProductCard from "@/components/Others/ProductCard";

const bodyMeasurementsInitial = {
  height: 165,
  weight: 50,
  chest: 90,
  waist: 70,
  hips: 95
};

const sizeTable = [
  { size: "32 (XS)", chest: [74, 77], waist: [61, 63], hips: [84, 87] },
  { size: "34", chest: [78, 81], waist: [64, 66], hips: [88, 91] },
  { size: "36 (S)", chest: [82, 85], waist: [67, 70], hips: [92, 95] },
  { size: "38", chest: [86, 89], waist: [71, 74], hips: [96, 98] },
  { size: "40 (M)", chest: [90, 93], waist: [75, 78], hips: [99, 101] },
  { size: "42", chest: [94, 97], waist: [79, 82], hips: [102, 104] },
  { size: "44 (L)", chest: [98, 102], waist: [83, 87], hips: [105, 108] },
  { size: "46", chest: [103, 107], waist: [88, 93], hips: [109, 112] },
  { size: "48 (XL)", chest: [108, 113], waist: [94, 99], hips: [113, 116] },
  { size: "50", chest: [114, 119], waist: [100, 106], hips: [117, 121] },
  { size: "52 (XXL)", chest: [120, 125], waist: [107, 112], hips: [122, 126] },
  { size: "54", chest: [126, 131], waist: [113, 119], hips: [127, 132] }
];


const Dashboard = () => {
  const modelRef = useRef({
    neck: null,
    waist: null,
    chest: null,
    model: null
  });
  const [bodySize, setBodySize] = useState({ upper: "", lower: "" }); // Beden bilgisi
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [products, setProducts] = useState(productsList);
  const [filteredProducts, setFilteredProducts] = useState(productsList);


  const handleFormikSubmit = (values) => {
    const { height, weight, chest, waist, hips } = values;

    if (modelRef.current.model) {
      // Göğüs genişliği
      if (modelRef.current.chest) {
        const chestScale = 1 + (chest - 90) / 100 + weight * 0.002;
        modelRef.current.chest.scale.x = chestScale;
        modelRef.current.chest.scale.z = chestScale;
      }

      // Bel genişliği
      if (modelRef.current.waist) {
        const waistScale = 1 + (waist - 70) / 100 + weight * 0.0015;
        modelRef.current.waist.scale.x = waistScale;
        modelRef.current.waist.scale.z = waistScale;
      }

      // Kalça genişliği
      if (modelRef.current.hips) {
        const hipsScale = 1 + (hips - 95) / 100 + weight * 0.002;
        modelRef.current.hips.scale.x = hipsScale;
        modelRef.current.hips.scale.z = hipsScale;
      }

      // Boy uzunluğu
      const heightScale = height / 165;
      modelRef.current.model.scale.set(1, heightScale, 1);
    }


    // Beden hesaplama
    const upperBodySize = getUpperBodySize({ chest });
    const lowerBodySize = getLowerBodySize({ waist, hips });

    // Beden bilgilerini kaydet
    setBodySize({ upper: upperBodySize, lower: lowerBodySize });
    const filtered = productsList.filter((product) =>
      product.sizes.includes(upperBodySize) || product.sizes.includes(lowerBodySize)
    );
    setFilteredProducts(filtered);

    setLoading(false); // Yükleme durumunu bitir


  };

  const formik = useCustomFormik(bodyMeasurementsInitial, handleFormikSubmit);

  useEffect(() => {
    console.table(products);
  }, []);

  const getUpperBodySize = ({ chest }) => {
    const size = sizeTable.find(
      (row) => chest >= row.chest[0] && chest <= row.chest[1]
    );
    return size ? size.size : "Bilinmiyor";
  };

  const getLowerBodySize = ({ waist, hips }) => {
    const size = sizeTable.find(
      (row) =>
        waist >= row.waist[0] &&
        waist <= row.waist[1] &&
        hips >= row.hips[0] &&
        hips <= row.hips[1]
    );
    return size ? size.size : "Bilinmiyor";
  };

  /*const filteredProducts = products.filter((product) =>
    product.sizes.includes(userClothingSize)
  );*/

  return (
    <div className="home-page">
      <div className="col-span-12 mb-6">
        <div className="p-5 w-full bg-orange-100/10 text-orange-400 rounded-2xl">
          Bedeninize uygun ürünleri bulmak için ölçümlerinizi girerek "Güncelle" butonuna tıklayınız.
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4">
          <div className=" p-12 bg-white border border-gray-200 rounded-xl">
            <h1 className="text-2xl font-semibold mb-8">Vücut ölçülerinizi Giriniz</h1>
            <FormikProvider value={formik}>
              <InputBox label="Boy (cm)" inputName="height" type="number" />
              <InputBox label="Kilo (kg)" inputName="weight" type="number" />
              <InputBox label="Göğüs Çevresi (mm)" inputName="chest" type="number" />
              <InputBox label="Bel Çevresi (mm)" inputName="waist" type="number" />
              <InputBox label="Kalça Çevresi (mm)" inputName="hips" type="number" />
              <CsButton label="Güncelle" onClick={() => formik.handleSubmit()} classname="mt-4 w-full" />
            </FormikProvider>
            {bodySize.lower && bodySize.upper &&
              <div className="p-8  mt-3 bg-white border border-gray-200 rounded-xl">
                <p className="mb-3">Alt Beden: <span className="font-semibold text-lg">{bodySize.lower}</span></p>
                <p>Üst Beden: <span className="font-bold text-lg">{bodySize.upper}</span></p>
              </div>}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <HumanModel modelRef={modelRef} />
        </div>
      </div>
      {
        loading ? <ProgressSpinner /> :
          <div className="grid grid-cols-12 gap-4">
            {bodySize.lower && bodySize.upper &&
              <>
                <div className="col-span-12">
                  <h1 className="text-xl font-bold text-black mt-8">Size Özel Ürünler</h1>
                </div>
                {filteredProducts.map((product) => (
                  <div className="col-span-6 md:col-span-4 lg:col-span-2" key={product.id}>
                    <ProductCard name={product.name} description={product.description} price={product.price}
                                 img={product.image} />
                  </div>
                ))}
              </>
            }
          </div>
      }
    </div>
  );
};

export default Dashboard;
