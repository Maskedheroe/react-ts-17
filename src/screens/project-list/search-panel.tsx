import { jsx } from '@emotion/react'
import React, { useState } from "react";
import { Input, Select, Form } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {
            users.map((user) => {
              return (
                <Select.OptGroup value={String(user.id)} key={user.id}>
                  {user.name + 1} 
                </Select.OptGroup>
              );
            })
          }
        </Select>
      </Form.Item>
    </Form>
  );
};
