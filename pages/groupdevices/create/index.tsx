import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryCreate() {
  return <QuNLNhMCreate />;
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
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox, Select, Row, Col } from "antd";
import dayjs from "dayjs";

const SPAN = 12;

export const QuNLNhMCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: devicesSelectProps } = useSelect({
    resource: "devices",
    // defaultValue: quNLNhMData?.devices,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={[20, 20]}>
          <Col span={SPAN}>
            <Form.Item
              label="Name"
              name={["name"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={SPAN}>
            <Form.Item
              label="Enabled"
              valuePropName="checked"
              name={["enabled"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Checkbox>Enabled</Checkbox>
            </Form.Item>
          </Col>
          <Col span={SPAN}>
            <Form.Item
              label="Description"
              name={["description"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={SPAN}>
            <Form.Item
              label="Devices"
              name={"devices"}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select mode="multiple" {...devicesSelectProps} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
