import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp, isPathMatch } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'
import { transformRoutes } from '@/utils/commonFun'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

const isWhiteList = (path) => {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

router.beforeEach(async(to, from) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    if (to.path === '/login') {
      NProgress.done()
      return { path: '/' }
    } else if (isWhiteList(to.path)) {
      return true
    } else {
      if(!useUserStore().id) {
          isRelogin.show = true;
          try {
            await useUserStore().getInfo();
            isRelogin.show = false;
            const accessRoutes = await usePermissionStore().generateRoutes();
            const codes = await usePermissionStore().getCodes();
            //  const routes = transformRoutes(accessRoutes)
            console.log(accessRoutes)
             accessRoutes.forEach(route => {
               if (!isHttp(route.path)) {
                 router.addRoute(route) // 动态添加可访问路由表
               }
             })
             console.log(router.getRoutes())
             return { ...to, replace: true }
          } catch (err) {
            await useUserStore().logOut()
            ElMessage.error(err)
            return { path: '/' }
          }
        } 
        return true
    }
  } else {
    // 没有token
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      return true
    } else {
      NProgress.done()
      return `/login?redirect=${to.fullPath}` // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
