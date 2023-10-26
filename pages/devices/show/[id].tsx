import { AntdShowInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryShow() {
  return <DeviceShow />;
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
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const SPAN = 12;

export const DeviceShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Row gutter={[20, 20]}>
        <Col span={SPAN}>
          <Title level={5}>Id</Title>
          <NumberField value={record?.id ?? ""} />
        </Col>
        <Col span={SPAN}>
          <Title level={5}>Created At</Title>
          <DateField value={record?.created_at} />
        </Col>
        <Col span={SPAN}>
          <Title level={5}>Updated At</Title>
          <DateField value={record?.updated_at} />
        </Col>
        <Col span={SPAN}>
          <Title level={5}>Name</Title>
          <TextField value={record?.name} />
        </Col>
        <Col span={SPAN}>
          <Title level={5}>Type</Title>
          <TextField value={record?.type} />
        </Col>
        <Col span={SPAN}>
          <Title level={5}>Enabled</Title>
          <BooleanField value={record?.enabled} />
        </Col>
      </Row>
    </Show>
  );
};
