const menu = [
  // {
  //   title: '首页',
  //   icon: 'el-icon-s-home',
  //   index: '1'
  // },
  {
    title: '表单',
    icon: 'el-icon-tickets',
    index: '2',
    children: [
      {
        title: '重置',
        icon: '',
        index: '2-1',
        url: '/console/form.html#/reset'
      },
      {
        title: '校验',
        icon: '',
        index: '2-2',
        url: '/console/form.html#/index'
      }
    ]
  },
  {
    title: '列表',
    icon: 'el-icon-s-data',
    index: '3',
    children: [
      {
        title: '合并',
        icon: '',
        index: '3-1',
        url: '/console/table.html#/combine'
      }
    ]
  },
  {
    title: '加解密',
    icon: 'el-icon-message',
    index: '4',
    children: [
      {
        title: '非对称加密RSA',
        icon: '',
        index: '4-1',
        url: '/console/encrypt.html#/encrypt-rsa'
      },
      {
        title: '对称加密AES',
        icon: '',
        index: '4-2',
        url: '/console/encrypt.html#/encrypt-aes'
      }
    ]
  }
]

export default menu
