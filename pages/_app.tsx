import {
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  Title,
  notificationProvider,
  useThemedLayoutContext,
} from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import { authProvider } from "src/authProvider";
import apiInstance from "src/apiInstance";
import axios from "axios";
import { ConfigProvider } from "antd";
import CustomizeThemedTitle from "@components/CustomizeThemedTitle";
import {
  DashboardOutlined,
  NotificationOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

const API_URL = "https://api.fake-rest.refine.dev";

import nookies from "nookies";
import { Devices, User } from "iconsax-react";

// const API_URL = "";

// import nookies from "nookies";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomizeTitle() {
  const { siderCollapsed } = useThemedLayoutContext();
  return (
    <ThemedTitleV2
      collapsed={siderCollapsed}
      text="Provincial Source Information System"
    />
  );
}

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Title={() => <CustomizeThemedTitle isOnSlider={true} />}
        Header={() => <Header sticky />}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <RefineKbarProvider>
        <ConfigProvider theme={RefineThemes.Blue}>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              demo: dataProvider(API_URL),
              default: dataProvider("", apiInstance as any),
              // articles: dataProvider("", apiInstance as any),
              // users: dataProvider("", apiInstance as any),
              // routerProvider={routerProvider}
            }}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "group_users",
                meta: {
                  label: "Người dùng",
                  icon: <User size="14" />,
                },
              },
              {
                name: "group_devices",
                meta: {
                  label: "Thiết bị",
                  icon: <Devices size="14" />,
                },
              },
              {
                meta: {
                  // dataProviderName: "articles",
                  canDelete: true,
                  label: "Articles",
                  icon: <NotificationOutlined />,
                },
                name: "articles",
                list: "/articles",
                create: "/articles/create",
                edit: "/articles/edit/:id",
                show: "/articles/show/:id",
              },
              {
                meta: {
                  // dataProviderName: "users",
                  // canDelete: true,
                  label: "Quản lý người dùng ",
                  parent: "group_users",
                },
                name: "users",
                list: "/users",
                // create: "/users/create",
                edit: "/users/edit/:id",
                show: "/users/show/:id",
              },

              {
                meta: {
                  canDelete: true,
                  label: "Quản lý quyền",
                  parent: "group_users",
                },
                name: "roles",
                list: "/roles",
                create: "/roles/create",
                edit: "/roles/edit/:id",
                show: "/roles/show/:id",
              },
              {
                meta: {
                  canDelete: true,
                  label: "Quản lý thiết bị",
                  // icon: <Devices size="14" />,
                  parent: "group_devices",
                },
                name: "devices",
                list: "/devices",
                create: "/devices/create",
                edit: "/devices/edit/:id",
                show: "/devices/show/:id",
              },
              {
                meta: {
                  canDelete: true,
                  label: "Quản lý nhóm",
                  // icon: <Devices size="14" />,
                  parent: "group_devices",
                },
                name: "groupdevices",
                list: "/groupdevices",
                create: "/groupdevices/create",
                edit: "/groupdevices/edit/:id",
                // show: "/groupdevices/show/:id",
              },

              {
                name: "devices/types",
              },

              // {
              //   name: "blog_posts",
              //   list: "/blog-posts",
              //   create: "/blog-posts/create",
              //   edit: "/blog-posts/edit/:id",
              //   show: "/blog-posts/show/:id",
              //   meta: {
              //     canDelete: true,
              //     dataProviderName: "demo",
              //   },
              // },
              {
                name: "categories",
                // list: "/categories",
                // create: "/categories/create",
                // edit: "/categories/edit/:id",
                // show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                  dataProviderName: "demo",
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "o6kPX8-T9nKSv-IA1YWk",
              textTransformers: {
                humanize: (text) => text,
                plural: (text) => text,
                singular: (text) => text,
              },
            }}>
            {renderComponent()}
            {/* <RefineKbar /> */}
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ConfigProvider>
      </RefineKbarProvider>
    </>
  );
}

export default MyApp;
