import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryShow() {
  return <ArticleShow />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
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

export const ArticleShow: React.FC<IResourceComponentsProps> = () => {
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
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Content</Title>
      <TextField value={record?.content} />
      <Title level={5}>Is Published</Title>
      <BooleanField value={record?.is_published} />
      <Title level={5}>Audios</Title>
      {record?.audios?.map((item: any) => (
        <TagField value={item?.name} key={item?.name} />
      ))}
      <Title level={5}>Images</Title>
      {record?.images?.map((item: any) => (
        <TagField value={item?.url} key={item?.url} />
      ))}
    </Show>
  );
};
