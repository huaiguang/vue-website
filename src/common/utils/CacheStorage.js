/**
 * 封装localStorage和sessionStorage
 * */

/**
 * 判断是否为某种参数的类型
 *
 * @param {*} type 基本的数据类型，主要首字母大写
 * @returns {boolean} 是否为当前的类型
 */
function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) === '[object ' + type + ']'
  }
}

const isObject = isType('Object')
const _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC')
let _defaultExpire = _maxExpireDate

// https://github.com/jeromegn/Backbone.localStorage/blob/master/backbone.localStorage.js#L63
const defaultSerializer = {
  serialize(item) {
    return JSON.stringify(item)
  },
  // fix for "illegal access" error on Android when JSON.parse is
  // passed null
  deserialize(data) {
    return data && JSON.parse(data)
  }
}

/**
 * 复制或者更新目标对象属性
 *
 * @param {object} obj 当前操作对象
 * @param {object} props 目标对象
 * @returns {object} 复制了props属性的obj对象
 */
function _extend(obj, props) {
  for (const key in props) obj[key] = props[key]
  return obj
}

/**
 * https://github.com/gsklee/ngStorage/blob/master/ngStorage.js#L52
 *
 * When Safari (OS X or iOS) is in private browsing mode, it appears as
 * though localStorage is available, but trying to call .setItem throws an
 * exception below: "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was
 * made to add something to storage that exceeded the quota."
 */
function _isStorageSupported(storage) {
  let supported = false
  if (storage && storage.setItem) {
    supported = true
    const key = '__' + Math.round(Math.random() * 1e7)
    try {
      storage.setItem(key, key)
      storage.removeItem(key)
    } catch (err) {
      supported = false
    }
  }
  return supported
}

// get storage instance
function _getStorageInstance(storage) {
  const type = typeof storage
  if (type === 'string' && window[storage] instanceof Storage) {
    return window[storage]
  }
  return storage
}

function _isValidDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())
}

/**
 * 获取超时日期
 *
 * @param {number|string} expires 超时秒数｜无限
 * @param {date} now 传入的日期，为空时为当前日期
 * @returns 到期日期
 */
function _getExpiresDate(expires, now) {
  now = now || new Date()

  if (typeof expires === 'number') {
    expires = expires === Infinity ?
      _maxExpireDate : new Date(now.getTime() + expires * 1000)
  } else if (typeof expires === 'string') {
    expires = new Date(expires)
  }

  if (expires && !_isValidDate(expires)) {
    throw new Error('`expires` parameter cannot be converted to a valid Date instance')
  }

  return expires
}

// http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
function _isQuotaExceeded(e) {
  let quotaExceeded = false
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true
          break
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true
          }
          break
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true
    }
  }
  return quotaExceeded
}

// cache item constructor
function CacheItemConstructor(value, exp) {
  // createTime
  this.c = (new Date()).getTime()
  exp = exp || _defaultExpire
  const expires = _getExpiresDate(exp)
  // expiresTime
  this.e = expires.getTime()
  this.v = value
}

function _isCacheItem(item) {
  if (!isObject(item)) {
    return false
  }
  if (item) {
    if ('c' in item && 'e' in item && 'v' in item) {
      return true
    }
  }
  return false
}

// check cacheItem If effective
function _checkCacheItemIfEffective(cacheItem) {
  const timeNow = (new Date()).getTime()
  return timeNow < cacheItem.e
}

function _checkAndWrapKeyAsString(key) {
  if (typeof key !== 'string') {
    console.warn(key + ' used as a key, but it is not a string.')
    key = String(key)
  }
  return key
}

// cache api
const CacheAPI = {

  set(key, value, options) {},

  get(key) {},

  delete(key) {},
  // Try the best to clean All expires CacheItem.
  deleteAllExpires() {},
  // Clear all keys
  clear() {},
  // Add key-value item to memcached, success only when the key is not exists in memcached.
  add(key, options) {},
  // Replace the key's data item in cache, success only when the key's data item is exists in cache.
  replace(key, value, options) {},
  // Set a new options for an existing key.
  touch(key, exp) {}
}

// cache api
const CacheAPIImpl = {

  set(key, val, options) {
    key = _checkAndWrapKeyAsString(key)

    options = _extend({
      force: true
    }, options)

    if (val === undefined) {
      return this.delete(key)
    }

    const value = defaultSerializer.serialize(val)

    const cacheItem = new CacheItemConstructor(value, options.exp)
    try {
      this.storage.setItem(key, defaultSerializer.serialize(cacheItem))
    } catch (e) {
      if (_isQuotaExceeded(e)) { //data wasn't successfully saved due to quota exceed so throw an error
        this.quotaExceedHandler(key, value, options, e)
      } else {
        console.error(e)
      }
    }

    return val
  },
  get(key) {
    key = _checkAndWrapKeyAsString(key)
    let cacheItem = null
    try {
      cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
    } catch (e) {
      return null
    }
    if (_isCacheItem(cacheItem)) {
      if (_checkCacheItemIfEffective(cacheItem)) {
        const value = cacheItem.v
        return defaultSerializer.deserialize(value)
      } else {
        this.delete(key)
      }
    }
    return null
  },

  delete(key) {
    key = _checkAndWrapKeyAsString(key)
    this.storage.removeItem(key)
    return key
  },
  //清除所有过期的数据条目
  deleteAllExpires() {
    const length = this.storage.length
    const deleteKeys = []
    const _this = this
    for (let i = 0; i < length; i++) {
      const key = this.storage.key(i)
      let cacheItem = null
      try {
        cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
      } catch (e) {}

      if (cacheItem !== null && cacheItem.e !== undefined) {
        const timeNow = (new Date()).getTime()
        if (timeNow >= cacheItem.e) {
          deleteKeys.push(key)
        }
      }
    }
    deleteKeys.forEach(key => {
      _this.delete(key)
    })
    return deleteKeys
  },

  clear() {
    this.storage.clear()
  },

  //这个方法只能添加key不存在的数据条，可以避免数据被无意之间篡改
  add(key, value, options) {
    key = _checkAndWrapKeyAsString(key)
    options = _extend({
      force: true
    }, options)
    try {
      const cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
      if (!_isCacheItem(cacheItem) || !_checkCacheItemIfEffective(cacheItem)) {
        this.set(key, value, options)
        return true
      }
    } catch (e) {
      this.set(key, value, options)
      return true
    }
    return false
  },

  replace(key, value, options) {
    key = _checkAndWrapKeyAsString(key)
    let cacheItem = null
    try {
      cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
    } catch (e) {
      return false
    }
    if (_isCacheItem(cacheItem)) {
      if (_checkCacheItemIfEffective(cacheItem)) {
        this.set(key, value, options)
        return true
      } else {
        this.delete(key)
      }
    }
    return false
  },
  //重新设置每条数据的过期时间
  touch(key, exp) {
    key = _checkAndWrapKeyAsString(key)
    let cacheItem = null
    try {
      cacheItem = defaultSerializer.deserialize(this.storage.getItem(key))
    } catch (e) {
      return false
    }
    if (_isCacheItem(cacheItem)) {
      if (_checkCacheItemIfEffective(cacheItem)) {
        this.set(key, this.get(key), {
          exp
        })
        return true
      } else {
        this.delete(key)
      }
    }
    return false
  }
}

/**
 * Cache Constructor
 */
function CacheConstructor(options) {
  // default options
  const defaults = {
    storage: 'localStorage',
    exp: Infinity //An expiration time, in seconds. default never .
  }

  const opt = _extend(defaults, options)

  const expires = opt.exp

  if (expires && typeof expires !== 'number' && !_isValidDate(expires)) {
    throw new Error('Constructor `exp` parameter cannot be converted to a valid Date instance')
  } else {
    _defaultExpire = expires
  }

  const storage = _getStorageInstance(opt.storage)

  const isSupported = _isStorageSupported(storage)


  this.isSupported = function() {
    return isSupported
  }

  if (isSupported) {
    this.storage = storage

    this.quotaExceedHandler = function(key, val, options, e) {
      console.warn('Quota exceeded!')
      if (options && options.force === true) {
        const deleteKeys = this.deleteAllExpires()
        console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!')
        try {
          options.force = false
          this.set(key, val, options)
        } catch (err) {
          console.warn(err)
        }
      }
    }
  } else { // if not support, rewrite all functions without doing anything
    _extend(this, CacheAPI)
  }
}

CacheConstructor.prototype = CacheAPIImpl
CacheConstructor.getInstance = function(opt) {
  return new CacheConstructor(opt)
}
export default CacheConstructor
