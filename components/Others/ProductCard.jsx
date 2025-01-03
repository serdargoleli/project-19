import React from "react";
import { Image } from "primereact/image";

const ProductCard = ({ name, description, price,img }) => {
  return (
    <div className="">
      <Image src={img} />
      <div>
        <h1 className="font-semibold text-lg">{name}</h1>
        <p className="font-light">{description}</p>
        <h3 className="text-lg font-bold">{"₺"}{price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;