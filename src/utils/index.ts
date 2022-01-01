import { useState, useEffect } from "react";

// 在一个函数里，改变传入的对象本身是不好的 (immutable)
// TODO

// 限制对象****
export const cleanObject = (object: { [key: string]: unknown }) => {
  // TODO
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // TODO
    // 包含了undefined null 0
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 自定义hook 必须以use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};


// unknown不能赋给别的变量，也不能从unknown上读取任何方法
// 我们想让这个函数的返回值 为 value的类型，而不是unknown类型
// 所以考虑后面用泛型来规范类型
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debuouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debuouncedValue;
};

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const isFalsy: (value: unknown) => boolean = (value) => {
  return value === 0 ? false : !value;
};
// TODO
//!!的意思就是把一个值转换成布尔值

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    },
  };
};
