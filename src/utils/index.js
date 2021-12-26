// TODO
// 在一个函数里，改变传入的对象本身是不好的 (immutable)
export const cleanObject = (object) => {
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

export const isFalsy = value => value === 0 ? false : !value
// TODO
//!!的意思就是把一个值转换成布尔值
