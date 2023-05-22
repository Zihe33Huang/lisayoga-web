import { axios } from '@/util/request'

export const getCoursePage = (params) => {
  return axios({
    url: 'course',
    method: 'get',
    params
  })
}

export const getCourseRefList = () => {
  return axios({
    url: 'course/list/ref',
    method: 'get'
  })
}

export const getCourseById = (id) => {
  return axios({
    url: 'course/' + id,
    method: 'get'
  })
}

export const getCourseConfig = () => {
  return axios({
    url: 'vip-card/config/',
    method: 'get'
  })
}

export const saveCourse = (data) => {
  console.log(data)
  return axios({
    url: 'course',
    method: 'post',
    data
  })
}

export const saveCourseConfig = (data) => {
  console.log(data)
  return axios({
    url: 'vip-card/config',
    method: 'post',
    data
  })
}

export const updateCourseById = (id, data) => {
  return axios({
    url: 'course/' + id,
    method: 'put',
    data
  })
}

export const updateCourseEnableStateById = (id, enableState) => {
  return axios({
    url: 'course/' + id + '/enable-state/' + enableState,
    method: 'put'
  })
}
