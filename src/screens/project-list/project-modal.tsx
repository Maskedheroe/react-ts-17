import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";
import { selectProjectModalOpen } from './project-list.slice';

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen) // useSelector是来读总状态树的，而不是读切片状态树的
  return (
    <Drawer
      width={"100%"}
      visible={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal)}
    >
      <h1>Project Modal</h1>
      <Button
        onClick={() => dispatch(projectListActions.closeProjectModal)}
      ></Button>
    </Drawer>
  );
};
