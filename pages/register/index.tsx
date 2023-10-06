import CustomizeThemedTitle from "@components/CustomizeThemedTitle";
import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";

import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function Register() {
  return (
    <AuthPage
      type="register"
      formProps={{
        initialValues: { email: "phucpv89@gmail.com", password: "abc" },
      }}
      title={<CustomizeThemedTitle />}
    />
  );
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: redirectTo ?? "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
