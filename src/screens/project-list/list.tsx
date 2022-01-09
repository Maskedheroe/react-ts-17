import React from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
// react-router 和 react-router-dom的关系， 类似于react和react-dom/react-native的关系
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";

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
  refresh?: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}
export const List = ({ users, list, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const dataList = list.map((value, index) => {
    return {
      ...value,
      key: index,
    };
  });
  // 柯里化改造
  // 这是目标函数，因为id和pin参数获得的时机不同，可以考虑使用柯里化进行改造
  // const pinProject = (id: number, pin: boolean) => mutate({id, pin})

  // 柯里化后的函数，为什么要这么写？因为先知道id，所以先让一个函数消化id，再知道pin，再让一个函数使用pin
  const pinProject = (id: number) => (pin: boolean) => {
    return mutate({ id, pin }).then(props.refresh);
  };
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        type="link"
                        onClick={() => props.setProjectModalOpen(true)}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      dataSource={dataList}
    />
  );
};
