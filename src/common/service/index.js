import httpMethod from './server-xhr'

/**
 * http get 请求
 * @param {string} url, 请求的路径
 * @param {object} params, 传递的业务参数
 * @param {object} options，应对特殊需求控制的请求参数
 */
function httpGet(url, params, options) {
  let queryString = '?'
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      queryString += `key=${params[key]}&`
    }
  }
  queryString = queryString.substring(0, queryString.length - 2)
  return httpMethod({
    url,
    method
  })
}

/**
 * http post请求
 * @param {string} url api
 * @param {object} params 业务参数
 * @param {object} options 应特殊需求定义的请求参数
 */
function httpPost(url, params, options) {
  return httpMethod({
    url,
    params
  })
}

export { httpGet, httpPost }
