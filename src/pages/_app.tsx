import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import RootLayout from "@/components/RootLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <SessionProvider session={session}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </SessionProvider>
    </ConfigProvider>
  );
}
