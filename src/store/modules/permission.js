import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'
import { getPowerCodes } from '@/api/login'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: []
    }),
    actions: {
      setRoutes(routes) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      generateRoutes(roles) {
        return new Promise(resolve => {
          // 向后端请求路由数据
          getRouters().then(rsp => {
            const res = Array.isArray(rsp) ? rsp : (Array.isArray(rsp?.data) ? rsp.data : [])
            const sdata = JSON.parse(JSON.stringify(res))
            const rdata = JSON.parse(JSON.stringify(res))
            const defaultData = JSON.parse(JSON.stringify(res))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach(route => { router.addRoute(route) })
            rewriteRoutes.forEach(route => {
              if (!router.hasRoute(route.name)) {
                router.addRoute(route)
              }
            })
            this.setRoutes(rewriteRoutes)
            // this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
            this.setSidebarRouters(sidebarRoutes)
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          })
        })
      },
      getCodes() {
        return new Promise(resolve => {
          getPowerCodes().then(res => {
            resolve(res.data)
          })
        })
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  const normalizePath = (value) => {
    if (value === null || value === undefined) return ''
    let path = String(value).trim().replace(/\\/g, '/')
    path = path.replace(/\/+/g, '/')
    if (!path) return ''
    if (!path.startsWith('/')) path = `/${path}`
    path = path.replace(/\/+/g, '/')
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
    return path
  }

  const normalizeComponent = (value) => {
    if (value === null || value === undefined) return ''
    let component = String(value).trim().replace(/\\/g, '/')
    component = component.replace(/\/+/g, '/')
    component = component.replace(/^\/+/, '')
    component = component.replace(/^views\//i, '')
    component = component.replace(/\.vue$/i, '')
    return component
  }

  const toMenuRoutePath = (menuItem) => {
    const raw = menuItem?.route ?? menuItem?.name ?? menuItem?.id
    const rawStr = raw === null || raw === undefined ? '' : String(raw).trim()
    const base = lastRouter && lastRouter.path ? String(lastRouter.path) : ''
    if (!rawStr) return ''
    if (rawStr.startsWith('/')) return normalizePath(rawStr)
    return normalizePath(`${base}/${rawStr}`)
  }

  const list = Array.isArray(asyncRouterMap) ? asyncRouterMap : []
  const sorted = list
    .filter(Boolean)
    .slice()
    .sort((a, b) => (Number(a?.weigh ?? 0) - Number(b?.weigh ?? 0)) || (Number(a?.id ?? 0) - Number(b?.id ?? 0)))

  return sorted
    .filter((route) => {
      if (route?.type === 'button') return false
      if (route?.status && route.status !== 'normal') return false
      return true
    })
    .map((route) => {
      const isMenuFormat = route && route.route !== undefined && route.type !== undefined

      if (!isMenuFormat) {
        if (type && route.children) {
          route.children = filterChildren(route.children)
        }
        if (route.component) {
          // Layout ParentView 组件特殊处理
          if (route.component === 'Layout') {
            route.component = Layout
          } else if (route.component === 'ParentView') {
            route.component = ParentView
          } else if (route.component === 'InnerLink') {
            route.component = InnerLink
          } else {
            route.component = loadView(route.component)
          }
        }
        if (route.children != null && route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children, route, type)
        } else {
          delete route['children']
          delete route['redirect']
        }
        return route
      }

      const path = toMenuRoutePath(route)
      const children = filterAsyncRouter(route.children || [], { path }, type)

      const result = {
        path,
        route: path,
        name: route.name || String(route.id),
        hidden: !!route.hide_menu,
        title: route.title,
        icon: route.icon || undefined,
        id: route.id,
        query: route.query,
        meta: {
          title: route.title,
          icon: route.icon || undefined,
          permission: route.permission || undefined,
          id: route.id,
          pid: route.pid,
          type: route.type,
          ...(route.meta_ext || {})
        }
      }

      if (route.type === 'catalog') {
        result.component = Layout
        if (children.length) result.redirect = children[0].path
      } else if (route.type === 'link') {
        result.component = InnerLink
      } else {
        const component = normalizeComponent(route.component)
        const byComponent = loadView(component)
        const byComponentIndex = loadView(component ? `${component}/index` : '')
        const byPathIndex = loadView(`${path.replace(/^\/+/, '')}/index`)
        const byPath = loadView(path.replace(/^\/+/, ''))
        result.component = byComponent || byComponentIndex || byPathIndex || byPath || null
      }

      if (children.length) result.children = children
      return result
    })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach(el => {
    el.path = lastRouter ? lastRouter.path + '/' + el.path : el.path
    if (el.children && el.children.length && el.component === 'ParentView') {
      children = children.concat(filterChildren(el.children, el))
    } else {
      children.push(el)
    }
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  if (!view) return undefined
  const normalized = String(view)
    .trim()
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
    .replace(/^\/+/, '')
    .replace(/^views\//i, '')
    .replace(/\.vue$/i, '')
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === normalized) {
      res = () => modules[path]()
    }
  }
  return res
}

export default usePermissionStore
