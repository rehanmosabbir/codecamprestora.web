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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { collapsed } = useHeaderStore();
  const { setCollapsed } = useHeaderStore();
  const isShow =
    router.asPath !== "/login" && router.asPath !== "/registration";

  return (
    <Layout>
      {isShow && (
        <Header
          className="shadow-lg"
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
          <div className="h-10 w-[10px] md:w-5 bg-white top-0 float-right z-20"></div>
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
              zIndex: 10,
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
            className={`bg-[#EEF2F6] ${
              !isDesktop && !collapsed ? "black-overlay" : ""
            }`}
            style={{
              padding: `${isShow ? "20px" : ""}`,
              paddingLeft: `${isShow ? `${isDesktop ? "20px" : "30px"}` : ""}`,
              borderRadius: borderRadiusLG,
              minHeight: `calc(100vh - 130px)`,
              position: "relative",
            }}
          >
            {children}
            {!isDesktop && !collapsed && (
              <div
                className="black-overlay transition"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0, 0, 0, 0.5)",
                  zIndex: 9,
                }}
                onClick={setCollapsed}
              />
            )}
          </Content>
        </Layout>
      </Layout>
      {isShow && (
        <Footer
          style={{
            zIndex: 10,
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
