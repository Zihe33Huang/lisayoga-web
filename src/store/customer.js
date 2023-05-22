import * as Api from '@/api/customer'

const customer = {
  state: {
  },
  mutations: {
  },
  actions: {
    GetCustomerPage ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.getCustomerPage(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerSearch ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.getCustomerSearch(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerCardSearch ({ commit }, param) {
      return new Promise((resolve, reject) => {
        Api.getCustomerCardSearch(param)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerRefList ({ commit }) {
      return new Promise((resolve, reject) => {
        Api.getCustomerRefList()
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.getCustomerById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    GetCustomerAppointedInfo ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.getCustomerAppointedInfo(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetCustomerByPhone ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.getCustomerByPhone(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetPersonCard ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.getPersonCard(data)
          .then(res => {
            console.log(res)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetPersonCourseInfo ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.getPersonCourseInfo(params)
          .then(res => {
            console.log(res)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetTeacherCourseInfo ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.getTeacherCourseInfo(params)
          .then(res => {
            console.log(res)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ComputeRefund ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.computeRefund(params)
          .then(res => {
            console.log(res)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetTeacherPayInfo ({ commit }, params) {
      return new Promise((resolve, reject) => {
        Api.getTeacherPayInfo(params)
          .then(res => {
            console.log(res)
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GetUploadFileById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.getUploadFileById(id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    SaveCustomer ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.saveCustomer(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    Appoint ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.Appoint(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    Refund ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.refund(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    CancelAppoint ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.CancelAppoint(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    openCard ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.openCard(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    changeDate ({ commit }, data) {
      return new Promise((resolve, reject) => {
        Api.changeDate(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    uploadFile ({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        Api.uploadFile(id, data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateCustomerById ({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        Api.updateCustomerById(id, data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DeleteFileById ({ commit }, id) {
      return new Promise((resolve, reject) => {
        Api.deleteFileById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateCustomerEnableStateById ({ commit }, { id, enableState }) {
      return new Promise((resolve, reject) => {
        Api.updateCustomerEnableStateById(id, enableState)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DeleteCustomerById ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        Api.deleteCustomerById(id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateCardEnableStateById ({ commit }, { id, enableState }) {
      return new Promise((resolve, reject) => {
        Api.updateCardEnableStateById(id, enableState)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UpdateIsFreeById ({ commit }, { id, isFree }) {
      return new Promise((resolve, reject) => {
        Api.updateIsFreeById(id, isFree)
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

export default customer
