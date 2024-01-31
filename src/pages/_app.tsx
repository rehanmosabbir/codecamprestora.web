import "@/styles/globals.css";
import { useState } from 'react';
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import theme from "../../theme/themeConfig";
import { SessionProvider } from "next-auth/react";
import RootLayout from "@/components/RootLayout";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={2 * 60}>
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
