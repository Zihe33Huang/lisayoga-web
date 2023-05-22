import * as Api from '@/api/course-scheduling'

const courseScheduling = {
  state: {
  },
  mutations: {
  },
  actions: {
    GetCourseSchedulingList ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.getCourseSchedulingList(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCourseSchedulingById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.getCourseSchedulingById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCourseFeeConfig ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.getCourseFeeConfig(params)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    SignIn ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.SignIn(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    CancelSignIn ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.CancelSignIn(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpWait ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.upWait(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerCourseById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.getCustomerCourseById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetAppointInfoByScheduleId ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.getAppointByScheduleId(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCourseSchedulingCourseCount ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.getCourseSchedulingCourseCount(params)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    SaveCourseScheduling ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.saveCourseScheduling(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    BatchSaveCourseScheduling ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.batchSaveCourseScheduling(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateCourseSchedulingById ({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        Api.updateCourseSchedulingById(id, data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateCourseSchedulingTimeById ({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        Api.updateCourseSchedulingTimeById(id, data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    RemoveCourseSchedulingById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.removeCourseSchedulingById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    RemoveCourseSchedulingByIdList ({ commit }, idList) {
      return new Promise((resolve, reject) => {
        Api.removeCourseSchedulingByIdList(idList)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default courseScheduling
