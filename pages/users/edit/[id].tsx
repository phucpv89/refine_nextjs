import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryEdit() {
  return <UserEdit />;
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

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const usersData = queryResult?.data?.data;

    const { selectProps: rolesSelectProps } = useSelect({
        resource: "roles",
        defaultValue: usersData?.roles?.map((item: any) => item?.id),
        optionLabel: "name",
    });

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
                {/* <Form.Item
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
                </Form.Item> */}
                <Form.Item
                    label="Name"
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Is Active"
                    valuePropName="checked"
                    name={["is_active"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Checkbox>Is Active</Checkbox>
                </Form.Item>
                <Form.Item
                    label="Roles"
                    name={"roles"}
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
                    getValueFromEvent={(selected: string[]) => {
                        return selected?.map((item) => ({ id: item }));
                    }}
                >
                    <Select mode="multiple" {...rolesSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
