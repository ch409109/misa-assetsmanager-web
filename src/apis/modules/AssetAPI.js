import BaseAPI from '@/apis/base/BaseAPI.js'
import api from '@/apis/config/APIConfig.js'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'assets'
  }

  getNewAssetCode() {
    return api.get(`/api/${this.controller}/new-code`)
  }
}

export default new AssetAPI()
