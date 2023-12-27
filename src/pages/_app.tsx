import { Footer } from "@/components/FooterComponent/Footer";
import { Header } from "@/components/HeaderComponent/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ConfigProvider } from "antd";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps, router }: AppProps) {
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
        <header className={roboto.className}>
          {shouldShowHeader() && <Header />}
        </header>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
        <footer className={roboto.className}>
          {shouldShowFooter() && <Footer />}
        </footer>
      </ConfigProvider>
    </>
  );
}
