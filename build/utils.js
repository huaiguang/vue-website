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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : ('' + o[k]).padStart(RegExp.$1.length, '0'))
    }
  }
  return fmt
}

Date.prototype.toJSON = function() {
  return dateFormat(this, 'yyyy-MM-dd hh:mm:ss')
}

module.exports = {
  getDate() {
    return new Date()
  }
}
