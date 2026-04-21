import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile/:activeTab?',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '游戏管理', icon: 'user'},
    children: [
      {
        path: 'betting-list',
        component: () => import('@/views/game/betting-list/index.vue'),
        name: 'BettingList',
        hidden: false,
        meta: { title: '投注列表', icon: 'user' }
      },
      {
        path: 'im-follow',
        component: () => import('@/views/game/im-follow/index.vue'),
        name: 'ImFollow',
        hidden: false,
        meta: { title: 'IM跟投', icon: 'user' }
      },
      {
        path: 'bettinglist-backup',
        component: () => import('@/views/game/bettinglist-backup/index.vue'),
        name: 'BettingListBackup',
        hidden: false,
        meta: { title: '投注列表备份', icon: 'user' }
      },
      {
        path: 'game-config',
        component: () => import('@/views/game/game-config/index.vue'),
        name: 'GameConfig',
        hidden: false,
        meta: { title: '游戏配置', icon: 'user' }
      },
      {
        path: 'statistical-reports',
        component: () => import('@/views/game/statistical-reports/index.vue'),
        name: 'StatisticalReports',
        hidden: false,
        meta: { title: '游戏统计', icon: 'user' }
      },
      {
        path: 'commision-list',
        component: () => import('@/views/game/commision-list/index.vue'),
        name: 'CommissionList',
        hidden: false,
        meta: { title: '佣金列表', icon: 'user' }
      },
      
      {
        path: 'classific',
        component: () => import('@/views/game/classific/index.vue'),
        name: 'LotteryResults',
        hidden: false,
        meta: { title: '游戏分类', icon: 'user' }
      },
      {
        path: 'gameplay',
        component: () => import('@/views/game/gameplay/index.vue'),
        name: 'Gameplay',
        hidden: false,
        meta: { title: '游戏玩法', icon: 'user' }
      },
      {
        path: 'odds-config',
        component: () => import('@/views/game/odds-config/index.vue'),
        name: 'OddsConfig',
        hidden: false,
        meta: { title: '盘口配置', icon: 'user' }
      },
      {
        path: 'lottery-result',
        component: () => import('@/views/game/lottery-result/index.vue'),
        name: 'LotteryResult',
        hidden: false,
        meta: { title: '开奖结果', icon: 'user' }
      },
    ]
  },
  {
    path: '/agent',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '代理管理', icon: 'user'},
    children: [
      {
        path: 'user',
        component: () => import('@/views/agent/user/index.vue'),
        name: 'AgentUser',
        hidden: false,
        meta: { title: '代理用户管理', icon: 'user' }
      },
      {
        path: 'balance',
        component: () => import('@/views/agent/balance/index.vue'),
        name: 'AgentBalance',
        hidden: false,
        meta: { title: '代理余额钱包列表', icon: 'user' }
      },
      {
        path: 'report',
        component: () => import('@/views/agent/balance-report/index.vue'),
        name: 'AgentReport',
        hidden: false,
        meta: { title: '代理用户余额列表', icon: 'user' }
      },
      {
        path: 'menu',
        component: () => import('@/views/agent/menu/index.vue'),
        name: 'AgentMenu',
        hidden: false,
        meta: { title: '代理菜单权限', icon: 'user' }
      },
      {
        path: 'actionlog',
        component: () => import('@/views/agent/actionlog/index.vue'),
        name: 'AgentActionLog',
        hidden: false,
        meta: { title: '代理操作日志列表', icon: 'user' }
      },
      {
        path: 'applay',
        component: () => import('@/views/agent/applay/index.vue'),
        name: 'AgentApplay',
        hidden: false,
        meta: { title: '代理申请', icon: 'user' }
      },
      {
        path: 'white-list',
        component: () => import('@/views/agent/white-list/index.vue'),
        name: 'AgentWhiteList',
        hidden: false,
        meta: { title: '代理白名单', icon: 'user' }
      },
    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '系统管理', icon: 'user'},
    children: [
      {
        path: 'user',
        component: () => import('@/views/system-manage/user/index.vue'),
        name: 'SystemManageUser',
        hidden: false,
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'action',
        component: () => import('@/views/system-manage/action/index.vue'),
        name: 'SystemManageAction',
        hidden: false,
        meta: { title: '操作日志', icon: 'user' }
      },
    ]
  },
  {
    path: '/currency',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '货币管理', icon: 'user'},
    children: [
      {
        path: 'config',
        component: () => import('@/views/currency/config/index.vue'),
        name: 'CurrencyConfig',
        hidden: false,
        meta: { title: '货币配置', icon: 'user' }
      },
      {
        path: 'userbalance',
        component: () => import('@/views/currency/userbalance/index.vue'),
        name: 'CurrencyUserBalance',
        hidden: false,
        meta: { title: '用户余额列表', icon: 'user' }
      },
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [

]

export const sidebarRouters = [
  {
    path: '/game',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '游戏管理', icon: 'user'},
    children: [
       {
        path: 'game-config',
        component: () => import('@/views/game/game-config/index.vue'),
        name: 'GameConfig',
        hidden: false,
        meta: { title: '游戏配置', icon: 'user' }
      },
      {
        path: 'gameplay',
        component: () => import('@/views/game/gameplay/index.vue'),
        name: 'Gameplay',
        hidden: false,
        meta: { title: '游戏玩法', icon: 'user' }
      },
      {
        path: 'classific',
        component: () => import('@/views/game/classific/index.vue'),
        name: 'Classific',
        hidden: false,
        meta: { title: '游戏分类', icon: 'user' }
      },
      {
        path: 'odds-config',
        component: () => import('@/views/game/odds-config/index.vue'),
        name: 'OddsConfig',
        hidden: false,
        meta: { title: '盘口配置', icon: 'user' }
      },
      {
        path: 'betting-list',
        component: () => import('@/views/game/betting-list/index.vue'),
        name: 'BettingList',
        hidden: false,
        meta: { title: '投注列表', icon: 'user' }
      },
      {
        path: 'lottery-result',
        component: () => import('@/views/game/lottery-result/index.vue'),
        name: 'LotteryResult',
        hidden: false,
        meta: { title: '开奖结果', icon: 'user' }
      },
      {
        path: 'im-follow',
        component: () => import('@/views/game/im-follow/index.vue'),
        name: 'ImFollow',
        hidden: false,
        meta: { title: 'IM跟投', icon: 'user' }
      },
      {
        path: 'bettinglist-backup',
        component: () => import('@/views/game/bettinglist-backup/index.vue'),
        name: 'BettingListBackup',
        hidden: false,
        meta: { title: '投注列表备份', icon: 'user' }
      },
     
      {
        path: 'statistical-reports',
        component: () => import('@/views/game/statistical-reports/index.vue'),
        name: 'StatisticalReports',
        hidden: false,
        meta: { title: '游戏统计', icon: 'user' }
      },
      {
        path: 'commision-list',
        component: () => import('@/views/game/commision-list/index.vue'),
        name: 'CommissionList',
        hidden: false,
        meta: { title: '佣金列表', icon: 'user' }
      },
      
      
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile/:activeTab?',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/agent',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '代理管理', icon: 'user'},
    children: [
      {
        path: 'user',
        component: () => import('@/views/agent/user/index.vue'),
        name: 'AgentUser',
        hidden: false,
        meta: { title: '代理用户管理', icon: 'user' }
      },
      {
        path: 'balance',
        component: () => import('@/views/agent/balance/index.vue'),
        name: 'AgentBalance',
        hidden: false,
        meta: { title: '代理余额钱包列表', icon: 'user' }
      },
      {
        path: 'report',
        component: () => import('@/views/agent/balance-report/index.vue'),
        name: 'AgentReport',
        hidden: false,
        meta: { title: '代理用户余额列表', icon: 'user' }
      },
      {
        path: 'menu',
        component: () => import('@/views/agent/menu/index.vue'),
        name: 'AgentMenu',
        hidden: false,
        meta: { title: '代理菜单权限', icon: 'user' }
      },
      {
        path: 'actionlog',
        component: () => import('@/views/agent/actionlog/index.vue'),
        name: 'AgentActionLog',
        hidden: false,
        meta: { title: '代理操作日志列表', icon: 'user' }
      },
      {
        path: 'applay',
        component: () => import('@/views/agent/applay/index.vue'),
        name: 'AgentApplay',
        hidden: false,
        meta: { title: '代理申请', icon: 'user' }
      },
      {
        path: 'white-list',
        component: () => import('@/views/agent/white-list/index.vue'),
        name: 'AgentWhiteList',
        hidden: false,
        meta: { title: '代理白名单', icon: 'user' }
      },
    ]
  },
  {
    path: '/system-manage',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '系统管理', icon: 'user'},
    children: [
      {
        path: 'user',
        component: () => import('@/views/system-manage/user/index.vue'),
        name: 'SystemManageUser',
        hidden: false,
        meta: { title: '人员管理', icon: 'user' }
      },
      {
        path: 'action',
        component: () => import('@/views/system-manage/action/index.vue'),
        name: 'SystemManageAction',
        hidden: false,
        meta: { title: '操作日志', icon: 'user' }
      },
    ]
  },
  {
    path: '/currency',
    component: Layout,
    hidden: false,
    redirect: 'noredirect',
    meta: { title: '货币管理', icon: 'user'},
    children: [
      {
        path: 'config',
        component: () => import('@/views/currency/config/index.vue'),
        name: 'CurrencyConfig',
        hidden: false,
        meta: { title: '货币配置', icon: 'user' }
      },
      {
        path: 'userbalance',
        component: () => import('@/views/currency/userbalance/index.vue'),
        name: 'CurrencyUserBalance',
        hidden: false,
        meta: { title: '用户余额列表', icon: 'user' }
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  sidebarRouters: sidebarRouters,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
