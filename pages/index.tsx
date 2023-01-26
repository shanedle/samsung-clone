import type { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Tab } from "@headlessui/react";

import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Product from "@/components/Product";
import ScrollToTop from "@/components/ScrollToTop";

import { Home as HomeProps } from "@/types/interfaces/home.interface";

import { fetchCategories } from "@/lib/utils/fetchCategories";
import { fetchProducts } from "@/lib/utils/fetchProducts";

export default function Home({ categories, products }: HomeProps) {
  const showProducts = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <Product product={product} key={product._id} />);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Samsung Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Landing />

      <ScrollToTop />

      <section className="relative min-h-screen">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-black md:text-5xl">
            Shop our latest offers and innovations
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    ` whitespace-nowrap px-5 text-[18px] font-medium md:px-6 ${
                      selected ? "underline decoration-2" : ""
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pb-24 sm:px-4">
              <Tab.Panel className="tab-panel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tab-panel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tab-panel">{showProducts(2)}</Tab.Panel>
              <Tab.Panel className="tab-panel">{showProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
}

// Backend
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
