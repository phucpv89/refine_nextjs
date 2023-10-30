import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryEdit() {
  return <ChNgTrNhEdit />;
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
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox, Select } from "antd";
import dayjs from "dayjs";

export const ChNgTrNhEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const chNgTrNhData = queryResult?.data?.data;

  const { selectProps: articlesSelectProps } = useSelect({
    resource: "articles",
    defaultValue: chNgTrNhData?.articles?.map((item: any) => item?.id),
  });

  function onFinish(e: any) {
    console.log(">>>>>>>>>>>>>>>", e);
    formProps?.onFinish && formProps?.onFinish(e);
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinish}>
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
        
        <Form.Item
          label="Tên"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Approved"
          valuePropName="checked"
          name={["approved"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Checkbox>Approved</Checkbox>
        </Form.Item>
        {/* <Form.Item
          label="Creator"
          name={["creator", "id"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Bản tin"
          name={"articles"}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value: any[]) => {
            return {
              value: value?.map((item) => item?.id),
            };
          }}
          getValueFromEvent={(selected: any[]) => {
            return selected?.map((item) => ({ id: item }));
          }}>
          <Select mode="multiple" {...articlesSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
