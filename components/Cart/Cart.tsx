import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../redux/cartSlice";

export default function Cart() {
  const items = useSelector(selectCartItems);

  if (items.length === 0) return null;

  return (
    <Link href="/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:bg-neutral-700">
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-red-700 text-[10px] text-white">
            {items.length}
          </span>
        )}
        <ShoppingCartIcon className="h-8 w-8" />
      </div>
    </Link>
  );
}
