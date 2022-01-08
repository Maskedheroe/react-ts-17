import { useState } from 'react';
import { useMountedRef } from 'utils';


interface State<D> {
  error: Error | null;
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, initialConfig}
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const [retry, setRetry] = useState(() => () => {
  }) // useState直接传入函数的含义是惰性初始化。所以要传入两层函数

  const mountedRef = useMountedRef()

  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })
  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  // run用来触发异步请求
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig)
      }
    })
    setState({...state, stat: 'loading'})
    return promise.then(data => {
      mountedRef.current && setData(data)
      return data
    }).catch(error => {
      // catch 会处理异常，如果不主动抛出外部接收不到异常
      setError(error)
      if (config.throwOnError) {
        return Promise.reject(error)
      }
      return Promise.reject(error)
    })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}

