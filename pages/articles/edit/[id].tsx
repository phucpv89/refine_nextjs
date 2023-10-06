import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryEdit() {
  return <ArticleEdit />;
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
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox } from "antd";
import dayjs from "dayjs";

export const ArticleEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const articlesData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Created At"
                    name={["created_at"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Updated At"
                    name={["updated_at"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name={["content"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Is Published"
                    valuePropName="checked"
                    name={["is_published"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Checkbox>Is Published</Checkbox>
                </Form.Item>
                <>
                    {(articlesData?.audios as any[])?.map((item, index) => (
                        <Form.Item
                            key={index}
                            label="Audios"
                            name={["audios", index, "name"]}
                        >
                            <Input type="text" />
                        </Form.Item>
                    ))}
                </>

                <>
                    {(articlesData?.images as any[])?.map((item, index) => (
                        <Form.Item
                            key={index}
                            label="Images"
                            name={["images", index, "url"]}
                        >
                            <Input type="text" />
                        </Form.Item>
                    ))}
                </>
            </Form>
        </Edit>
    );
};

