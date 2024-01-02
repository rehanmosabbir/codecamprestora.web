import React, { ReactNode } from "react";
import { Button, Layout, theme } from "antd";

import LeftMenuBar from "./LeftMenuBar";
import { useRouter } from "next/router";

const { Header, Content, Sider, Footer } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const isShow =
    router.asPath !== "/login" && router.asPath !== "/registration";

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
          }}
        ></Header>
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
            width="17%"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              background: colorBgContainer,
              top: 60,
              left: 0,
            }}
          >
            <LeftMenuBar />
          </Sider>
        )}
        <Layout style={{ padding: "5px" }}>
          <Content
            style={{
              marginLeft: `${isShow ? "19%" : ""}`,
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
              marginLeft: `${isShow ? "17%" : ""}`,
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
