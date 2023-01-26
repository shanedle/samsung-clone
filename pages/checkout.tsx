import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import Stripe from "stripe";

import { selectCartItems, selectCartTotal } from "@/store/cart";

import Button from "@/components/Button";
import Header from "@/components/Header";
import CheckoutProduct from "@/components/CheckoutProduct";

import { fetchPostJSON } from "@/lib/utils/api-helpers";
import getStripe from "@/lib/utils/get-stripejs";

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const router = useRouter();
  const [groupedItemsInCart, setGroupedItemsInCart] = useState(
    {} as { [key: string]: Product[] }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInCart(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items: items,
      }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Samsung Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <div className="divide-y divide-gray-300">
            <h1 className="text-1xl my-4 text-2xl font-semibold">Cart</h1>
            {items.length === 0 && (
              <>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="mt-6 font-semibold lg:text-2xl">
                      Your cart is empty.
                    </h2>
                    <p className="mt-2 mb-8">
                      Add an item before you checkout.
                    </p>

                    <Button
                      title="CONTINUE SHOPPING"
                      onClick={() => router.push("/")}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={cartTotal} currency="NOK" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={cartTotal} currency="NOK" />
                  </h4>
                </div>
              </div>

              <div className="my-14 space-y-4">
                <Button
                  loading={loading}
                  title="CHECKOUT"
                  width="w-full"
                  onClick={createCheckoutSession}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
