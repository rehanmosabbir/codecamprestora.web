import React, { ReactNode } from "react";
import { Grid, Layout, theme } from "antd";
import { useRouter } from "next/router";

import LeftMenuBar from "./LeftMenuBar";
import useHeaderStore from "@/useHeaderStore";
import { AppHeader } from "./HeaderComponent/Header";
import { AppFooter } from "./FooterComponent/Footer";

const { Header, Content, Sider, Footer } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { collapsed } = useHeaderStore();
  const isShow =
    router.asPath !== "/login" && router.asPath !== "/registration";
  const width = "260px";

  return (
    <Layout>
      {isShow && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            height: 88,
            width: "100%",
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
            collapsed={collapsed}
            width={width}
            style={{
              overflow: "auto",
              height: "100vh",
              top: 0,
              paddingLeft: "10px",
              paddingRight: "10px",
              display: "flex",
              background: colorBgContainer,
              left: 0,
            }}
          >
            <div className="">
              <LeftMenuBar />
            </div>
          </Sider>
        )}
        <Layout>
          <Content
            style={{
              margin: `${isShow ? "20px" : ""}`,
              background: "#F5F5F5",
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      {isShow && (
        <Footer
          style={{
            zIndex: 1,
            width: "100%",
            padding: 0,
          }}
        >
          <AppFooter />
        </Footer>
      )}
    </Layout>
  );
};

export default RootLayout;
