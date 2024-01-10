import React, { ReactNode, useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import LeftMenuBar from "./LeftMenuBar";
import useHeaderStore from "@/useHooks/useHeaderStore";
import { AppHeader } from "./HeaderComponent/Header";
import { AppFooter } from "./FooterComponent/Footer";
import useMediaQuery from "@/useHooks/useMediaQueryHook";

const { Header, Content, Sider, Footer } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { collapsed } = useHeaderStore();
  const isShow =
    router.asPath !== "/login" && router.asPath !== "/registration";

  return (
    <Layout>
      {isShow && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
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
          paddingRight: `${isShow ? `${isDesktop ? "20px" : "10px"}` : ""}`,
          background: colorBgContainer,
        }}
      >
        {isShow && (
          <Sider
            collapsedWidth={`${isDesktop ? 75 : 10}`}
            collapsed={collapsed}
            width={"260px"}
            style={{
              zIndex: 5,
              position: `${isDesktop ? "sticky" : "fixed"}`,
              height: "100%",
              top: 88,
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              style={{
                height: "100%",
                border: 0,
              }}
              mode="inline"
            >
              <div className="px-3">
                <LeftMenuBar />
              </div>
            </Menu>
          </Sider>
        )}
        <Layout>
          <Content
            style={{
              margin: `${isShow ? "20px" : ""}`,
              paddingLeft: `${isShow ? `${isDesktop ? "0" : "10px"}` : ""}`,
              borderRadius: borderRadiusLG,
              minHeight: `calc(100vh - 170px)`,
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
      <style jsx>{``}</style>
    </Layout>
  );
};

export default RootLayout;
