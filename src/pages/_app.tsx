import { Footer } from "@/components/FooterComponent/Footer";
import { Header } from "@/components/HeaderComponent/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfigProvider theme={theme}>
        <header className={roboto.className}>
          <Header />
        </header>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
        <footer className={roboto.className}>
          <Footer />
        </footer>
      </ConfigProvider>
    </>
  );
}
