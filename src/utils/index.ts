import { useState, useEffect } from 'react';


// 在一个函数里，改变传入的对象本身是不好的 (immutable)
// TODO

export const cleanObject = (object: object) => {
  // TODO
  // Object.assign({}, object)
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    // TODO
    // 包含了undefined null 0
    if (!value) {
      delete result[key]
    }
  })
  return result
}

// 自定义hook 必须以use开头
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

// const debounce = (func, delay) => {
//   let timeout
//   return (...params) => {
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(function() {
//       func(...params)
//     }, delay)
//   }
// }
export const useDebounce = (value: any, delay?: number) => {
  const [debuouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debuouncedValue
}

export const isFalsy = (value: any) => (value === 0 ? false : !value)
// TODO
//!!的意思就是把一个值转换成布尔值
