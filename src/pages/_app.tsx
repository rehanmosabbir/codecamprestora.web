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
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
