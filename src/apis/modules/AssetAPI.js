import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'assets'
  }
}

export default new AssetAPI()
