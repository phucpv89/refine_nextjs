import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { authProvider } from "src/authProvider";

export default function CategoryList() {
  // return <AntdListInferencer />;
  return <DeviceList />;
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
import { Table, Space, Tag } from "antd";

export const DeviceList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  function renderStatus() {
    return <Tag color="processing">Phát theo lịch</Tag>;
  }

  return (
    <List>
      <Table {...tableProps} rowKey="id" >
        <Table.Column dataIndex="name" title="Tên thiết bị" />
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column
          title="Tín hiệu"
          render={(value) => <Tag color="cyan">Ổn định</Tag>}
          align="center"
        />
        <Table.Column title="Trạng thái" render={renderStatus} align="center"/>

        <Table.Column
          dataIndex={["created_at"]}
          title="Created At"
          
          render={(value: any) => <DateField value={value} />}
          align="center"
        />
        <Table.Column
          dataIndex={["updated_at"]}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
          align="center"
        />

        <Table.Column dataIndex="type" title="Type" />
        <Table.Column
          dataIndex={["enabled"]}
          title="Enabled"
          align="center"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex="address"
          title="Address"
          align="center"
          render={(value) => `Vĩ độ: ${value?.lat} - Kinh độ: ${value?.lng}`}
        />

        <Table.Column
          title="Actions"
          dataIndex="actions"
          align="center"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
