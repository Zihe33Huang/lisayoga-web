import { axios } from '@/util/request'

export const getCourseSchedulingList = (params) => {
  return axios({
    url: 'course-scheduling/list',
    method: 'post',
    data: params
  })
}

export const getCourseSchedulingById = (id) => {
  return axios({
    url: 'course-scheduling/' + id,
    method: 'get'
  })
}

export const getCourseFeeConfig = (params) => {
  return axios({
    url: 'teacher/conf',
    method: 'get',
    params
  })
}

export const getCourseSchedulingCourseCount = (params) => {
  return axios({
    url: 'course-scheduling/course/count',
    method: 'post',
    data: params
  })
}

export const getCustomerCourseById = (params) => {
  return axios({
    url: 'appoint/customerCourse',
    method: 'get',
    data: params
  })
}
export const getAppointByScheduleId = (params) => {
  return axios({
    url: 'appoint',
    method: 'get',
    params
  })
}

export const SignIn = (params) => {
  return axios({
    url: 'appoint/signIn',
    method: 'post',
    data: params
  })
}

export const CancelSignIn = (params) => {
  return axios({
    url: 'appoint/signIn',
    method: 'delete',
    data: params
  })
}

export const upWait = (params) => {
  return axios({
    url: 'appoint/upWait',
    method: 'post',
    data: params
  })
}

export const saveCourseScheduling = (data) => {
  return axios({
    url: 'course-scheduling',
    method: 'post',
    data
  })
}

export const batchSaveCourseScheduling = (data) => {
  return axios({
    url: 'course-scheduling/batch',
    method: 'post',
    data
  })
}

export const updateCourseSchedulingById = (id, data) => {
  return axios({
    url: 'course-scheduling/' + id,
    method: 'put',
    data
  })
}

export const updateCourseSchedulingTimeById = (id, data) => {
  return axios({
    url: 'course-scheduling/' + id + '/time',
    method: 'put',
    data
  })
}

export const removeCourseSchedulingById = (id) => {
  return axios({
    url: 'course-scheduling/' + id,
    method: 'delete'
  })
}

export const removeCourseSchedulingByIdList = (idList) => {
  return axios({
    url: 'course-scheduling/batch',
    method: 'delete',
    data: idList
  })
}
