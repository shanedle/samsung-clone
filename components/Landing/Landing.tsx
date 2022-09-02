import Image from "next/image";
import React from "react";

import Button from "../Button";

export default function Landing() {
  return (
    <section className="mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold lg:text-6xl xl:text-7xl">
            Galaxy Z Fold4 | Z Flip4
          </h1>
          <p className="text-2xl">
            Lorem ipsum dolor sit amet, consectetur adip
          </p>
        </div>

        <div className="space-x-8">
          <a className="link">Learn More</a>
          <Button title="Buy Now" />
        </div>
      </div>

      <div className="relative transition-all duration-500 md:inline lg:h-[100%] lg:w-[100%]">
        <Image src="/fold4_flip4.png" layout="fill" objectFit="contain" />
      </div>
    </section>
  );
}
