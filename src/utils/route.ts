import router from "@/router"

// 创建路由历史闭包
function History() {
  let history:string[] = []
  return {
    get: () => {
      return history
    },
    pop: () => {
      history.pop()
    },
    push: (path: string) => {
      history.push(path)
    },
    replace: (path: string) => {
      if (history.length === 0) {
        return
      }
      history.splice(-1, 1, path)
    },
    reset: () => {
      history = []
    }
  }
}
export const history = History()

// 返回
export function back() {
  router.go(-1)
  history.pop()
}

// 路由跳转
export function go(path: string) {
  router.push(path)
  history.push(path)
}

// 路由替换
export function replace(path: string) {
  router.replace(path)
  // 替换history数组最后一个
  history.replace(path)
}

// 路由跳转并关闭所有页面
export function goAndCloseAll(path: string) {
  const routeHistory = history.get().length
  if (routeHistory >= 1) {
    router.go(-routeHistory)
  }
  // 延迟5ms再跳转
  setTimeout(() => {
    router.replace(path)
    // 清空历史,因为是关闭所有所以可以认为是首次打开状态
    history.reset()
  }, 10);
}