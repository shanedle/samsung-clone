import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stripe from "stripe";
import Currency from "react-currency-formatter";

import { selectCartItems, selectCartTotal } from "../redux/cartSlice";

import Button from "../components/Button";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";

import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";

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
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your cart." : "Your cart is empty."}
          </h1>

          {items.length === 0 && (
            <>
              <p className="my-4">Add an item before you checkout.</p>

              <Button
                title="Continue Shopping"
                onClick={() => router.push("/")}
              />
            </>
          )}
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
                  noIcon
                  loading={loading}
                  title="Check Out"
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
