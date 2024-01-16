import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";
import RootLayout from "@/components/RootLayout";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ConfigProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ConfigProvider>
    </SessionProvider>
  );
}
