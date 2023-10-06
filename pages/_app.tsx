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
import { DashboardOutlined, NotificationOutlined } from "@ant-design/icons";

const API_URL = "https://api.fake-rest.refine.dev";

// const API_URL = "";

const httpClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5naGlhbHRAdm5nLmNvbS52biIsImxhc3RfbG9naW5fYXQiOiIyMDIzLTA5LTI5VDE5OjExOjExLjM2NzI2OCswNzowMCJ9.IROPPiWh5e073D5EVVibiPEnbjYl9GxdnEoMFtOmgdo",
  },
});

httpClient.interceptors.response.use(
  (response) => {
    console.log(">>>>>>>>>>>>>", response);
    // const { data } = response;

    if (response?.data?.data?.items) {
      return {
        ...response,
        data: response?.data?.data?.items,
      };
    }
    if (response?.data?.data) {
      return {
        ...response,
        data: response?.data?.data,
      };
    }
    return {
      ...response,
    };
  },
  (error) => {
    const customError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

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
              default: dataProvider(API_URL, httpClient as any),
              articles: dataProvider("", httpClient as any),
            }}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            resources={[
              {
                meta: {
                  dataProviderName: "articles",
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
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "o6kPX8-T9nKSv-IA1YWk",
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
