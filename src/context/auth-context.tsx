import React, { useState, ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "utils";
import { useAsync } from "../utils/use-async";
import { FullPageLoading, FullPageError } from "../components/lib";
import * as authStore from 'store/auth.slice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  
  useMount(() => {
    run(dispatch(authStore.bootStrap()));
  });
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageError error={error}/>
  }
  return <div>
    {children}
  </div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback((form: AuthForm) => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout
  };
};

export default AuthProvider;
