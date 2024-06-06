import React, { useRef, useEffect, startTransition } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { mount } from 'sider/App' // NOTE 注意这里的写法和配置的对应关系

const RemoteSider: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const history = useHistory()
  useEffect(() => {
    // NOTE 通过 mount 把 dashboard 挂载到 div 上，这些参数和返回值是实现数据共享的方式，稍后细说
    const { onParentNavigate } = mount(ref.current!, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname }: Location) => {
        if (history.location.pathname !== pathname) {
          console.log('navigate to', pathname)
          startTransition(() => {
            history.push(pathname)
          })
        }
      },
      // sharedData: { isSignedIn, user },
    })
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
};

export default RemoteSider;