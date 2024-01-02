import React, { ReactNode } from "react";
import { Button, Layout, theme } from "antd";

import LeftMenuBar from "./LeftMenuBar";

const { Header, Content, Sider, Footer } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
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
      <Layout
        hasSider
        style={{ paddingRight: "20px", background: colorBgContainer }}
      >
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
        <Layout style={{ padding: "5px" }}>
          <Content
            style={{
              marginLeft: "17%",
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
          <Footer style={{ marginLeft: "17%", textAlign: "center" }}>
            Restora App ©2023
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
