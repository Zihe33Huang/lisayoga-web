import { axios } from '@/util/request'

export const getCustomerPage = (params) => {
  return axios({
    url: 'customer',
    method: 'get',
    params
  })
}

export const getCustomerSearch = (params) => {
  return axios({
    url: 'customer/search',
    method: 'get',
    params
  })
}
export const getCustomerCardSearch = (params) => {
  return axios({
    url: 'customer/customerCard',
    method: 'get',
    params
  })
}
export const getCustomerRefList = () => {
  return axios({
    url: 'customer/list/ref',
    method: 'get'
  })
}

export const getCustomerById = (id) => {
  return axios({
    url: 'customer/' + id,
    method: 'get'
  })
}

export const getCustomerAppointedInfo = (id) => {
  return axios({
    url: 'appoint/appointed/' + id,
    method: 'get'
  })
}

export const getCustomerByPhone = (params) => {
  return axios({
    url: 'customer/login',
    method: 'get',
    params
  })
}

export const getUploadFileById = (id) => {
  return axios({
    url: 'file/' + id,
    method: 'get'
  })
}

export const getPersonCard = (data) => {
  return axios({
    url: 'vip-card/getPersonInfo',
    method: 'post',
    data
  })
}

export const getPersonCourseInfo = (params) => {
  return axios({
    url: 'appoint/customerCourse/',
    method: 'get',
    params
  })
}

export const getTeacherCourseInfo = (params) => {
  return axios({
    url: 'teacher/course/',
    method: 'get',
    params
  })
}

export const computeRefund = (params) => {
  return axios({
    url: 'vip-card/computeRefund',
    method: 'get',
    params
  })
}

export const getTeacherPayInfo = (params) => {
  return axios({
    url: 'teacher/pay/',
    method: 'get',
    params
  })
}

export const saveCustomer = (data) => {
  return axios({
    url: 'customer',
    method: 'post',
    data
  })
}

export const refund = (data) => {
  return axios({
    url: 'vip-card/refund',
    method: 'post',
    data
  })
}

export const Appoint = (data) => {
  return axios({
    url: 'appoint',
    method: 'post',
    data
  })
}

export const CancelAppoint = (data) => {
  return axios({
    url: 'appoint',
    method: 'delete',
    data
  })
}

export const openCard = (data) => {
  return axios({
    url: 'vip-card/create',
    method: 'post',
    data
  })
}

export const changeDate = (data) => {
  return axios({
    url: 'vip-card/changeDate',
    method: 'put',
    data
  })
}

export const updateCustomerById = (id, data) => {
  return axios({
    url: 'customer/' + id,
    method: 'put',
    data
  })
}

export const deleteFileById = (id) => {
  return axios({
    url: 'file/' + id,
    method: 'delete'
  })
}

export const uploadFile = (id, data) => {
  var bodyFormData = new FormData()
  data.files.forEach((file) => {
    bodyFormData.append('file', file.raw)
  })
  return axios({
    url: 'customer/uploadFile/' + id,
    method: 'post',
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
}

export const updateCustomerEnableStateById = (id, enableState) => {
  return axios({
    url: 'customer/' + id + '/enable-state/' + enableState,
    method: 'put'
  })
}

export const deleteCustomerById = (id) => {
  return axios({
    url: 'customer/' + id,
    method: 'delete'
  })
}

export const updateCardEnableStateById = (id, enableState) => {
  return axios({
    url: 'vip-card/' + id + '/enable-state/' + enableState,
    method: 'put'
  })
}

export const updateIsFreeById = (id, isFree) => {
  return axios({
    url: 'vip-card/' + id + '/isFree/' + isFree,
    method: 'put'
  })
}
