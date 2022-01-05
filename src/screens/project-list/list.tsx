import React from "react";
import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
// react-router 和 react-router-dom的关系， 类似于react和react-dom/react-native的关系
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// TODO 把所有id都改成number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
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
  // console.log('...', {...props})
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
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
    />
  );
};
