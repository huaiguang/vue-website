/**
 * 正则分组捕获
 * 正则匹配时，默认是贪婪模式
 */
const SIGN_REGEXP = /([yMdhms])(\1*)/g,
    // 默认的时间格式
      DEFAULT_PATTERN = 'yyyy-MM-dd'

/**
 * 补全日期中单个时间前面的0，例如一月 '01'
 * @param  {[string]} s   [the string to deal]
 * @param  {[number]} len [the reserved length]
 * @return {[string]}     [add extra 0 to the left of the s]
 */
function padding(s, len) {
  const newLen = len - String(s).length

  for (let i = 0; i < newLen; i++) {
    s = '0' + s
  }
  return s
}

/**
 * format the date string by the pattern
 * @param {date} date
 * @param {string} pattern the required format date string, as 'yyyy-MM-dd hh:mm:ss'
 * @return {string}
 */
function dateFormat(date, pattern) {
  date = date || new Date()
  pattern = pattern || DEFAULT_PATTERN
  return pattern.replace(SIGN_REGEXP, $0 => {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length)
      case 'M':
        return padding(date.getMonth() + 1, $0.length)
      case 'd':
        return padding(date.getDate(), $0.length)
      case 'h':
        return padding(date.getHours(), $0.length)
      case 'm':
        return padding(date.getMinutes(), $0.length)
      case 's':
        return padding(date.getSeconds(), $0.length)
      // no default
    }
  })
}

/**
 * parse the date object by date string
 * @param {string} dateString date string, as '2021-01-06 14:23:18'
 * @param {string} pattern required format date string, as 'yyyy-MM-dd hh:mm:ss', and the length must be same as the length of dateString
 * @return {date} the parsed date
 */
function dateParse(dateString, pattern) {
  const matchs1 = pattern.match(SIGN_REGEXP),
        matchs2 = dateString.match(/(\d)+/g)

  if (matchs1.length === matchs2.length) {
    const _date = new Date(1970, 0, 1)

    for (let i = 0; i < matchs1.length; i++) {
      const _int = parseInt(matchs2[i], 10),
            sign = matchs1[i]

      switch (sign.charAt(0)) {
        case 'y':
          _date.setFullYear(_int)
          break
        case 'M':
          _date.setMonth(_int - 1)
          break
        case 'd':
          _date.setDate(_int)
          break
        case 'h':
          _date.setHours(_int)
          break
        case 'm':
          _date.setMinutes(_int)
          break
        case 's':
          _date.setSeconds(_int)
          break
        // no default
      }
    }
    return _date
  }
  return null
}

export { dateFormat, dateParse }
