const menu = [
  {
    title: '首页',
    icon: 'el-icon-s-home',
    index: '1',
    url: './home.html'
  },
  {
    title: '表单',
    icon: 'el-icon-tickets',
    index: '2',
    children: [
      {
        title: '基础',
        icon: '',
        index: '2-1',
        url: './form.html#/base'
      },
      {
        title: '校验',
        icon: '',
        index: '2-2',
        url: './form.html#/valid'
      },
      {
        title: '上传',
        icon: '',
        index: '2-3',
        url: './form.html#/upload'
      }
    ]
  },
  {
    title: '表格',
    icon: 'el-icon-s-data',
    index: '3',
    children: [
      {
        title: '筛选',
        icon: '',
        index: '3-1',
        url: './table.html#/screen'
      },
      {
        title: '合并',
        icon: '',
        index: '3-2',
        url: './table.html#/combine'
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
        url: './encrypt.html#/encrypt-rsa'
      },
      {
        title: '对称加密AES',
        icon: '',
        index: '4-2',
        url: './encrypt.html#/encrypt-aes'
      }
    ]
  }
]

export default menu
