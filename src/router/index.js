import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import CMain from '@/views/CMain'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/course-scheduling',
    component: Main,
    children: [
      {
        path: '/course-scheduling',
        component: () => import('@/views/course-scheduling/CourseScheduling.vue')
      },
      {
        path: '/course-scheduling-list',
        component: () => import('@/views/course-scheduling-list/CourseSchedulingList.vue')
      },
      {
        path: '/classroom',
        component: () => import('@/views/classroom/Classroom.vue')
      },
      {
        path: '/customer',
        component: () => import('@/views/customer/Customer.vue')
      },
      {
        path: '/course',
        component: () => import('@/views/course/Course.vue')
      },
      {
        path: '/teacher',
        component: () => import('@/views/teacher/Teacher.vue')
      },
      {
        path: '/report',
        component: () => import('@/views/report/Report.vue')
      },
      {
        path: '/config',
        name: 'config',
        component: () => import('@/views/course/ConfigDiscount.vue')
      }
    ]
  },
  {
    path: '/cend',
    name: 'cend',
    component: CMain,
    children: [
      {
        path: '/appoint',
        component: () => import('@/views/cend/Appoint.vue')
      },
      {
        path: '/home',
        component: () => import('@/views/cend/Home.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/cend/My.vue')
      },
      {
        path: '/appointedInfo',
        name: 'appointedInfo',
        component: () => import('@/views/cend/AppointInfo.vue')
      }
    ]
  },
  {
    path: '/clogin',
    name: 'clogin',
    component: () => import('@/views/cend/Login.vue')
  }
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () => import('@/views/login/Login.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
