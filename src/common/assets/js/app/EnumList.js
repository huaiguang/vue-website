const activityTypes = [
  {
    id: '000',
    name: '活动性质一',
    options: [
      {
        name: '线上主题活动',
        value: '00'
      }
    ]
  },
  {
    id: '001',
    name: '活动性质二',
    options: [
      {
        name: '活动性质二',
        value: '01'
      }
    ]
  },
  {
    id: '002',
    name: '活动性质三',
    options: [
      {
        name: '美食餐厅',
        value: '02'
      },
      {
        name: '咖啡厅',
        value: '03'
      }
    ]
  }
]

const productList = [
  {
    id: '000',
    group: '平台收款',
    options: [
      { name: '店铺提现', value: '01' },
      { name: '店铺异常退款', value: '02' }
    ]
  },
  {
    id: '001',
    group: '缴税付款',
    options: [{ name: 'VAT', value: '07' }]
  },
  {
    id: '002',
    group: '钱包提现',
    options: [{ name: '钱包提现', value: '08' }]
  },
  {
    id: '004',
    group: '充值',
    options: [
      { name: '钱包充值', value: '09' },
      { name: '充值异常资金退款', value: '10' }
    ]
  },
  {
    id: '001',
    group: '换汇',
    options: [{ name: '换汇', value: '11' }]
  }
]

export { activityTypes, productList }
