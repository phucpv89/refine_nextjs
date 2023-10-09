import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryShow() {
  return <UserShow />;
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
    EmailField,
    BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
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
            <Title level={5}>Email</Title>
            <EmailField value={record?.email} />
            <Title level={5}>Is Active</Title>
            <BooleanField value={record?.is_active} />
            <Title level={5}>Roles</Title>
            <>
              {record?.roles?.map((item: any, index: number) => (
                <TagField key={index} value={item.name} />
              ))}
            </>
        </Show>
    );
};
