import { Footer } from "@/components/FooterComponent/Footer";
import { Header } from "@/components/HeaderComponent/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ConfigProvider, Flex } from "antd";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";
import LeftMenuBar from "@/components/LeftMenuBar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const isShow = (): boolean => {
    const pathsWithoutHeader = ["/registration", "/login"];

    return !pathsWithoutHeader.includes(router.pathname);
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <header className={`${roboto.className} sticky top-0`}>
              {isShow() && <Header />}
            </header>
            <main
              className={`${roboto.className} flex-grow ${
                isShow() ? "px-5" : ""
              } overflow-hidden`}
            >
              <div className="grid grid-cols-6">
                {isShow() && <LeftMenuBar />}
                <div className={isShow() ? `col-span-5` : "col-span-6"}>
                  <Component {...pageProps} />
                </div>
              </div>
            </main>
            <footer className={roboto.className}>
              {isShow() && <Footer />}
            </footer>
          </div>
        </SessionProvider>
      </ConfigProvider>
    </>
  );
}
