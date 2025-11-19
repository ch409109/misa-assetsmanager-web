import BaseAPI from '@/apis/base/BaseAPI.js'

class AssetTypeAPI extends BaseAPI {
  constructor() {
    super()
    this.controller = 'assettypes'
  }
}

export default new AssetTypeAPI()
