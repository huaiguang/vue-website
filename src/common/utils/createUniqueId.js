function createUniqueId() {
  const expect = 16
  let str = Math.random().toString(36).substr(2)
  if (str.length < expect) {
    str += Math.random().toString(36).substr(2)
  }
  str = str.substr(0, 16)
  return str
}


