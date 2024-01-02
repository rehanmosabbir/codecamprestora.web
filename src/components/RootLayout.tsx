import React, { ReactNode } from "react";
import { Grid, Layout, theme } from "antd";
import { useRouter } from "next/router";

import LeftMenuBar from "./LeftMenuBar";
import useHeaderStore from "@/useHeaderStore";
import { AppHeader } from "./HeaderComponent/Header";

const { Header, Content, Sider, Footer } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { collapsed } = useHeaderStore();
  const { useBreakpoint } = Grid;
  const { lg, xs } = useBreakpoint();
  // console.log(lg);
  const isShow =
    router.asPath !== "/login" && router.asPath !== "/registration";
  const width = lg ? "17%" : xs ? "50%" : "25%";

  return (
    <Layout>
      {isShow && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: colorBgContainer,
            padding: 0,
          }}
        >
          <AppHeader />
        </Header>
      )}
      <Layout
        hasSider
        style={{
          paddingRight: `${isShow ? "20px" : ""}`,
          background: colorBgContainer,
        }}
      >
        {isShow && (
          <Sider
            trigger={null}
            breakpoint="sm"
            collapsible
            // collapsedWidth="5%"
            collapsed={collapsed}
            width={width}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              background: colorBgContainer,
              top: 75,
              left: 0,
            }}
          >
            <LeftMenuBar />
          </Sider>
        )}
        <Layout style={{ padding: "5px" }}>
          <Content
            style={{
              marginLeft: `${
                isShow
                  ? collapsed
                    ? `${lg ? "7.5%" : xs ? "25%" : "14%"}`
                    : `${lg ? "19%" : "28%"}`
                  : ""
              }`,
              marginTop: `${isShow ? "15px" : ""}`,
              marginRight: `${isShow ? "15px" : ""}`,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
          <Footer
            style={{
              marginLeft: `${isShow ? (collapsed ? "7%" : "19%") : ""}`,
              textAlign: "center",
            }}
          >
            Restora App ©2023
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
