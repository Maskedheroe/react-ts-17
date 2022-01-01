import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useState } from "react";
import { useDebounce } from "../../utils/index";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 1000);

  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
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
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
