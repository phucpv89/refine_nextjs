import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryCreate() {
  return <ArticleCreate />;
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
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";

export const ArticleCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Content"
          name={["content"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Is Published"
          valuePropName="checked"
          name={["is_published"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Checkbox>Is Published</Checkbox>
        </Form.Item>
        <Form.Item
          label="Content"
          name={["content"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Create>
  );
};
