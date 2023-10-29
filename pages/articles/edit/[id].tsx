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
        destination: `${redirectTo}?to=${encodeURIComponent("/articles")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useApiUrl,
  useResource,
} from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Checkbox, Col, Upload, Image } from "antd";
import dayjs from "dayjs";
import UploadMedia from "@components/MediaView/UploadMedia";

const { TextArea } = Input;

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
          ]}>
          <Input readOnly disabled />
        </Form.Item>
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
        <>
          {(articlesData?.audios as any[])?.map((item, index) => (
            <Form.Item
              key={index}
              label="Audios"
              name={["audios", index, "name"]}>
              <Input type="text" />
            </Form.Item>
          ))}
        </>

        <>
          {/* {(articlesData?.images as any[])?.map((item, index) => (
            <Form.Item
              key={index}
              label="Images"
              name={["images", index, "url"]}>
              <UploadMedia />
            </Form.Item>
          ))} */}
        </>
        <Form.Item label="Images" name={["images"]}>
          <UploadMedia />
        </Form.Item>

        <Form.Item
          label="Content"
          name={["content"]}
          rules={[
            {
              required: true,
            },
          ]}>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
