# Loading

## Feature
1. 在 loading 中直接添加方法，可在 beforeCreate 中直接执行，而不必必须等到 created 才执行

## Usage
1. 类似jQuery插件, 引用后可直接执行
```javascript
import Loading from '@/common/components/Loading/Loading'

beforeCreate() {
  Loading.show()
  setTimeout(() => {
    Loading.hide()
  }, 30000)
}
```

2. 挂载到 Vue.$prototype 上
```javascript
import Loading from '@/common/components/Loading/Loading'

Vue.use(Loading)

created() {
  this.$loading.show()
  setTimeout(() => {
    this.$loading.hide()
  }, 3000)
}
```

## todoItemList
1. 在关闭 loading 时添加过渡效果
