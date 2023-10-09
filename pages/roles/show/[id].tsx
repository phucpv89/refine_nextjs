import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryShow() {
  return <RoleShow />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/articles")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
    Show,
    NumberField,
    DateField,
    TagField,
    TextField,
    BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const RoleShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Created At</Title>
            <DateField value={record?.created_at} />
            <Title level={5}>Updated At</Title>
            <DateField value={record?.updated_at} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Enabled</Title>
            <BooleanField value={record?.enabled} />
        </Show>
    );
};
