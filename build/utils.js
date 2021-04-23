function dateFormat(date, fmt) {
  if (!date) return ''
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    S: date.getMilliseconds() //毫秒
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('' + o[k]).padStart(RegExp.$1.length, '0')
      )
    }
  }
  return fmt
}

/**
 * 问题: 通过JSON.parse解析的日期会丢失时区信息，默认是东8区(utf-8),取出后变为了格林威治(utf-0),早了8个小时
 * 解决: 重写Date的toJSON方法, 返回需要的格式和时间
 * @returns {string} 返回当前时区的日期字符串
 */
Date.prototype.toJSON = function() {
  return dateFormat(this, 'yyyy-MM-dd hh:mm:ss')
}

module.exports = {
  getDate() {
    return new Date()
  }
}
