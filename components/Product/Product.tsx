import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Button from "@/components/Button";

import { addToCart } from "@/store/cartSlice";

import { urlFor } from "@/lib/sanity";

interface Props {
  product: Product;
}

export default function Product({ product }: Props) {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(product));

    toast.success(`${product.title} added to cart.`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#f4f4f4] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex items-center justify-between space-x-3 text-center">
        <div className="w-full space-y-2 text-center text-xl text-black md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price} kr</p>
        </div>
      </div>
      <div className="flex items-center justify-center" onClick={addItemToCart}>
        <Button title="Buy Now" />
      </div>
    </div>
  );
}
