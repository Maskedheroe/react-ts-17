import { useSearchParams } from "react-router-dom";

/**
 * 返回页面url中，指定键的参数值
 */

export const useQueryQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
      // 注意[key]的这个语法细节：它代表的是变量作为变量名，而不是像直接写key时候的，key就成了变量名
      // {key: '骑手'} 和 {name: '骑手'} 的差别，[key]的作用就是第二个对象
    }, {} as { [key in string]: string }),
    setSearchParam,
  ] as const;
  // 注意 as const 语法，这种语法便是转成最原始的类型
};
