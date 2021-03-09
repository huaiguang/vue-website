function splitAddress(str) {
  let tempArray = []
  if (!str) return tempArray

  // 按照节点分割字符串
  function split(str, points) {
    const tempArray = []
    // 从前到后依次对节点进行切割，
    // 必须按照顺序，按照节点次数切割，防止详细地址中存在节点
    const length = points.length
    for (let i = 0; i < length; i++) {
      const index = str.indexOf(points[i])
      if (index > -1) {
        const realIndex = index + 1
        const addressPart = str.substring(0, realIndex)
        str = str.substring(realIndex)
        tempArray.push(addressPart)
      } else {
        tempArray.push(str)
        str = ''
        break
      }
    }
    if (str.length > 0) {
      tempArray.push(str)
    }
    return tempArray
  }

  // 4个直辖市
  const specialCites = ['北京市', '上海市', '重庆市', '天津市']
  // 5个自治区
  const specialDistrict = ['内蒙古自治区', '西藏自治区', '广西壮族自治区', '宁夏回族自治区', '新疆维吾尔自治区']
  // 判断是否为直辖市
  const isSpecialCity = specialCites.some(item => str.startsWith(item))
  // 判断是否为自治区
  const isSpecialDistrict = specialDistrict.some(item => str.startsWith(item))

  if (isSpecialCity) {
    const points = ['市', '区']
    tempArray = split(str, points)
    tempArray.unshift(tempArray[0])
  } else if (isSpecialDistrict) {
    const index = str.indexOf('区')
    const firstItem = str.substring(0, index + 1)
    str = str.substring(index + 1)
    tempArray.push(firstItem, str)
  } else {
    // 23个省
    const points = ['省', '市', '区']
    tempArray = split(str, points)
  }
  return tempArray
}


function testSplitAddress() {
  const addressList = [
    '甘肃省临泽县新华镇大寨村六社39号',
    '湖北省武汉市洪山区洛佳路1037号',
    '上海市金山区枫泾镇环东一路65弄2号3598室',
    '上海市枫泾镇环东一路65弄2号3598室',
    '内蒙古自治区呼和浩特市赛罕市开鲁县北清河乡',
    '山东省滨州市邹平县长山镇大省村'
  ]

  addressList.map(item => {
    const address = this.splitAddress(item)
    console.log(address)
    return address
  })
}

export {
  splitAddress,
  testSplitAddress
}
