import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
