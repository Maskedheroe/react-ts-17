import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { ProjectScreen } from "./screens/project/ProjectScreen";
import {} from "react-router-dom";
import { resetRoute } from "./utils/index";
import { Row } from "./components/lib";
import { ProjectModal } from './screens/project-list/project-modal';
import { ProjectPopover } from './components/ProjectPopover';

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  // 这个函数里所有使用到的组件都只是申明，因为我们在申明一个组件 export const component = () => {}
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen}/>
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route
              path="*"
              element={<Navigate to="/projects"></Navigate>}
            ></Route>
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
    </Container>
  );
};

const PageHeader = ({setProjectModalOpen} : { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return (
    <Header between={true}>
      <Row gap={true}>
        <div onClick={resetRoute} style={{ cursor: "pointer" }}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </div>
        <ProjectPopover setProjectModalOpen={setProjectModalOpen}/>
        <span>用户</span>
      </Row>
      <HeaderRight>
        <User/>
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

// Temporal dead zone 暂时性死区
const HeaderRight = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Main = styled.main``;
