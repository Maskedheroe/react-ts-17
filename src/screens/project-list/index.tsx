import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useState } from "react";
import { useDebounce } from "../../utils/index";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Button, Typography } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { Row } from "components/lib";
import { ButtonNoPadding } from '../../components/lib';

export const ProjectListScreen = () => {
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象(非响应式的对象)，绝不可以放到依赖里
  const [keys, setKeys] = useState<("name" | "personId")[]>([
    "name",
    "personId",
  ]);
  const [param, setParam] = useProjectsSearchParams(keys);
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  // useEffect的大坑！！！！！
  const { data: users } = useUsers();
  const { open } = useProjectModal()
  return (
    <Container>
      <Row between={true} style={{ justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type='link'>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        list={list || []}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
        refresh={retry}
      ></List>
    </Container>
  );
};
ProjectListScreen.whyDidYouRender = false;
// 等于class组件的 static whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
`;
