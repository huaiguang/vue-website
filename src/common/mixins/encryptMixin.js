import { createAesKey, aesEncrypt, rsaEncrypt } from '@/common/utils/encryption'
import { storageMethod } from '../utils/commonUtil'

export default {
  data() {
    return {
      aesKey: ''
    }
  },
  methods: {
    initAesKey() {
      if (!this.aesKey) {
        const localAesKey = storageMethod('local').get('aesKey')
        if (localAesKey) {
          this.aesKey = localAesKey
        } else {
          this.getAesKey()
        }
      }
    },
    getAesKey() {
      const newAesKey = createAesKey()
      const params = {
        key: rsaEncrypt(newAesKey)
      }
      this.$httpPost(api.getAesKey, params).then(() => {
        this.aesKey = newAesKey
      })
    },
    aesEncrypt
  }
}
