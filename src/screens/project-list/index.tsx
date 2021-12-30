import { List } from "./list";
import { SearchPanel } from "./search-panel";
import React, { useEffect, useState } from "react";
import * as qs from 'qs'
import { cleanObject, useDebounce } from '../../utils/index';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp()
  const debouncedParam = useDebounce(param, 1000)
  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam]);
  useEffect(() => {
    client('users').then(setUsers)
  }, []); // 空数组的作用就是在页面加载的时候，只调用一次，等于componentdidMount
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`
