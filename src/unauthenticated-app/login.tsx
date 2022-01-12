import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from '../utils/use-async';

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user, register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async (value: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(value))
    } catch (error) {
      onError(error as Error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
