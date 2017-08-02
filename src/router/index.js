import Vue from 'vue'
import Router from 'vue-router'
import twitter from '@/components/Tweet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tweet',
      component: twitter
    }
  ]
})
