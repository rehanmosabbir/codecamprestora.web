import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";
import RootLayout from "@/components/RootLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={theme}>
      <SessionProvider session={session}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </SessionProvider>
    </ConfigProvider>
    </QueryClientProvider>
  );
}
