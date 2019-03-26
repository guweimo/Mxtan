import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: () => import('@/views/blog/Blog')
    },
    {
      path: '/login',
      component: () => import('@/views/sign/signIn')
    },
    // { path: '/register', component: signUp },
    {
      path: '/main',
      component: () => import('@/views/home/main'),
      children: [{
          path: '/home',
          component: () => import('@/views/home/home')
        },
        {
          path: '/markPreview',
          component: () => import('@/views/preview/markPreview')
        },
        {
          path: '/save',
          component: () => import('@/views/save/Save')
        },
        {
          path: '/error',
          component: () => import('@/views/error/error'),
          children: [{
            path: '404',
            component: () => import('@/views/error/404')
          }]
        },
        {
          path: '/javascript',
          component: () => import('@/views/list/jsList')
        },
        {
          path: '/css',
          component: () => import('@/views/list/cssList')
        },
        {
          path: '/vue',
          component: () => import('@/views/list/vueList')
        },
        {
          path: '/search/:title',
          component: () => import('@/views/list/search')
        },
        {
          name: 'article',
          path: '/article/:id',
          component: () => import('@/views/detail/detail')
        },
        {
          path: '/test',
          component: () => import('@/views/test/test')
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  Vue.prototype.$message({
    close: true,
  })

  // 判断是否匹配到路由，如果不匹配则跳转到home路由，反则继续跳转到当前的路由
  if (to.matched.length == 0) {
    from.name ? next({
      name: from.name
    }) : next('/error/404')
  } else {
    next()
  }

  const type = to.path.replace(/\//ig, '')
  router.app.$options.store.state.selectType = type
})

export default router
