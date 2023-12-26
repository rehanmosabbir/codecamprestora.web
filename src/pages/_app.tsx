import { Footer } from "@/components/FooterComponent/Footer";
import { Header } from "@/components/HeaderComponent/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ConfigProvider, Flex } from "antd";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const shouldShowHeader = (): boolean => {
    const pathsWithoutHeader = ["/registration", "/login"];

    return !pathsWithoutHeader.includes(router.pathname);
  };
  const shouldShowFooter = (): boolean => {
    const pathsWithoutFooter = ["/registration", "/login"];

    return !pathsWithoutFooter.includes(router.pathname);
  };
  return (
    <>
      <ConfigProvider theme={theme}>
        <SessionProvider session={session}>
          <Flex className="flex-col min-h-screen">
            <header className={roboto.className}>
              {shouldShowHeader() && <Header />}
            </header>
            <main className={`${roboto.className} flex-grow`}>
              <Component {...pageProps} />
            </main>
            <footer className={roboto.className}>
              {shouldShowFooter() && <Footer />}
            </footer>
          </Flex>
        </SessionProvider>
      </ConfigProvider>
    </>
  );
}
