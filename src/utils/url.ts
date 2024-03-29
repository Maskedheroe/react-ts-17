import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from './index';

/**
 * 返回页面url中，指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () => 
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
          // 注意[key]的这个语法细节：它代表的是变量作为变量名，而不是像直接写key时候的，key就成了变量名
          // {key: '骑手'} 和 {name: '骑手'} 的差别，[key]的作用就是第二个对象
        }, {} as { [key in K]: string }),
      [searchParams, keys]
      // 如果在数组中加入keys，则又会陷入loop，而searchParams不用，因为它是个响应式的对象
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // Object.fromEntries的作用
      // iterator 迭代器，或遍历器。
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit 
      return setSearchParam(o)
    },
  ] as const;
  // 注意 as const 语法，这种语法便是转成最原始的类型
};
