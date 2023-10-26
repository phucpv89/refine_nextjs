import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryEdit() {
  return <DeviceEdit />;
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

// const { selectProps: categorySelectProps } = useSelect({
//   resource: "categories",
//   defaultValue: blogPostsData?.category?.id,
// });

{
  /* <Select {...categorySelectProps} /> */
}

import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Select,
  Row,
  Col,
  InputNumber,
} from "antd";
import dayjs from "dayjs";

const SPAN = 12;

export const DeviceEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const devicesData = queryResult?.data?.data;
  const selectType = useSelect({
    resource: "devices/types",
  });
  const options = selectType?.queryResult.data?.data.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={[20, 20]}>
          <Col span={SPAN}>
            <Form.Item
              label="Id"
              name={["id"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input readOnly disabled />
            </Form.Item>
          </Col>
          <Col span={SPAN}>
            <Form.Item
              label="Tên thiết bị"
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
              label="Type"
              name={["type"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <Select options={options} />
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
              label="Vĩ độ"
              name={["address", "lat"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <InputNumber placeholder="Nhập vĩ độ" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={SPAN}>
            <Form.Item
              label="Kinh độ"
              name={["address", "lng"]}
              rules={[
                {
                  required: true,
                },
              ]}>
              <InputNumber
                placeholder="Nhập kinh độ"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
