import Image from "next/image";
import Currency from "react-currency-formatter";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { XIcon } from "@heroicons/react/outline";

import { CheckoutProduct as CheckoutProductProps } from "@/types/interfaces/checkoutproduct.interface";

import { removeFromCart } from "@/store/cartSlice";

import { urlFor } from "@/lib/sanity";

export default function CheckoutProduct({ id, items }: CheckoutProductProps) {
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));

    toast.error(`${items[0].title} removed from cart.`, {
      position: "bottom-center",
    });
  };

  return (
    <>
      <div className="flex justify-end">
        <div onClick={removeItemFromCart} className="cursor-pointer">
          <XIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
        <div className="relative h-44 w-44">
          <Image
            src={urlFor(items[0].image[0]).url()}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="flex flex-1 items-end lg:items-center">
          <div className="flex-1 space-y-4">
            <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
              <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
              <p className="flex items-end gap-x-1 font-semibold">
                {items.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <h4 className="text-xl font-semibold lg:text-2xl">
              <Currency
                quantity={items.reduce((total, item) => total + item.price, 0)}
                currency="NOK"
              />
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
