import { api } from '@/api'

export interface Page {
  path: string,
  name: string,
  type: string,
}
export class Route {
  pages: Page[] = []
  tabbar: TabbarItem[] = []
}

export interface TabbarItem {
  path: string,
  name: string,
  icon:{
    type:string,
    iconPath:string,
    selectedIconPath:string
  }
}

var router: Route | null = null
async function getPages() {
  if (!router) {
    let re = await api.GetPages()
    if (re) {
      router = re
    } else {
      router = new Route()
    }
  }
  return router
}

export async function createRoutes() {
  let temp = await getPages()
  if (!temp) {
    temp = new Route()
  } else if (!temp.pages || !temp.pages.length) {
    temp.pages = []
  } else if (!temp.tabbar || !temp.tabbar.length) {
    temp.tabbar = []
  }

  // 构建普通路由
  var local = temp.pages.filter((item: Page) => {
    if (item.type === 'local') {
      return true
    }
  })
  let routes = local.map((item: Page) => {
    return {
      path: `${item.path}`,
      name: item.path.split('/').join(''),
      component: () => import(`@/views${item.path}.vue`),
    }
  })
  let page = {
    path: '/Home',
    name: 'Home',
    component: () => import(`@/views/Home.vue`),
    redirect: routes.length ? routes[0].path : '/',
    children: routes,
  }
  return [page]
}

export function getRoute() {
  return router
}