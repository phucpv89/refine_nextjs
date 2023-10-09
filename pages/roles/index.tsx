import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryList() {
  return <RoleList />;
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
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    DateField,
    BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const RoleList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column
                    dataIndex={["created_at"]}
                    title="Created At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["updated_at"]}
                    title="Updated At"
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column
                    dataIndex={["enabled"]}
                    title="Enabled"
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="middle"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="middle"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="middle"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
