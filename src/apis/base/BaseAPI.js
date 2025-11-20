import api from '@/apis/config/APIConfig.js'

export default class BaseAPI {
  constructor() {
    this.controller = null
  }

  getAll(params = {}) {
    return api.get(`/api/${this.controller}`, { params })
  }

  getById(id) {
    return api.get(`/api/${this.controller}/${id}`)
  }

  update(id, body) {
    return api.put(`/api/${this.controller}/${id}`, body)
  }

  delete(id) {
    return api.delete(`/api/${this.controller}/${id}`)
  }

  create(body) {
    return api.post(`/api/${this.controller}/new`, body)
  }
}
