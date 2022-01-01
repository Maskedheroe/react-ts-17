import React from "react";
import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  list: Project[];
}
export const List = ({ users, list, ...props }: ListProps) => {
  const dataList = list.map((value, index) => {
    return {
      ...value,
      key: index,
    };
  });

  return (
    <Table
      pagination={false}
      columns={[
        { 
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>;
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={dataList}
      {...props}
    />
  );
};
