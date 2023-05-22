import { axios } from '@/util/request'

export const getTeacherPage = (params) => {
  return axios({
    url: 'teacher',
    method: 'get',
    params
  })
}

export const getTeacherRefList = () => {
  return axios({
    url: 'teacher/list/ref',
    method: 'get'
  })
}

export const getTeacherById = (id) => {
  return axios({
    url: 'teacher/' + id,
    method: 'get'
  })
}

export const saveTeacher = (data) => {
  var bodyFormData = new FormData()
  data.files.forEach((file) => {
    bodyFormData.append('file', file.raw)
  })
  bodyFormData.append('name', data.name)
  bodyFormData.append('akaName', data.akaName)
  bodyFormData.append('enterTime', data.enterTime)
  bodyFormData.append('birthday', data.birthday)
  bodyFormData.append('phoneNum', data.phoneNum)
  bodyFormData.append('qualification', data.qualification)
  bodyFormData.append('introduction', data.introduction)
  bodyFormData.append('type', data.type)
  bodyFormData.append('basicSalary', data.basicSalary)
  bodyFormData.append('royaltyRate', data.royaltyRate)
  bodyFormData.append('allowance', data.allowance)
  return axios({
    method: 'post',
    url: 'teacher',
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  })
}

export const confirmPay = (data) => {
  return axios({
    method: 'post',
    url: 'teacher/payConfirm',
    data: data
  })
}

export const confirmRefund = (data) => {
  return axios({
    method: 'post',
    url: 'vip-card/refund',
    data: data
  })
}

export const updateConfig = (data) => {
  return axios({
    method: 'post',
    url: 'teacher/conf',
    data: data
  })
}

export const updateTeacherById = (id, data) => {
  var bodyFormData = new FormData()
  data.files.forEach((file) => {
    bodyFormData.append('file', file.raw)
  })
  bodyFormData.append('pictureUrlList', data.pictureUrlList)
  bodyFormData.append('name', data.name)
  bodyFormData.append('akaName', data.akaName)
  bodyFormData.append('enterTime', data.enterTime)
  bodyFormData.append('birthday', data.birthday)
  bodyFormData.append('phoneNum', data.phoneNum)
  bodyFormData.append('qualification', data.qualification)
  bodyFormData.append('introduction', data.introduction)
  bodyFormData.append('type', data.type)
  bodyFormData.append('basicSalary', data.basicSalary)
  bodyFormData.append('royaltyRate', data.royaltyRate)
  bodyFormData.append('allowance', data.allowance)

  return axios({
    url: 'teacher/' + id,
    method: 'post',
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }

  })
}

export const updateTeacherEnableStateById = (id, enableState) => {
  return axios({
    url: 'teacher/' + id + '/enable-state/' + enableState,
    method: 'put'
  })
}
