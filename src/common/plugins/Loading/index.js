import './loading.css'

const Loading = {}

Loading.show = () => {
  if (document.querySelector('.wrap-loading')) return
  const loadingWrap = document.createElement('DIV')
  loadingWrap.className = 'wrap-loading'
  const innerLoader = '<div class="loader"></div>'
  loadingWrap.innerHTML = innerLoader
  document.body.appendChild(loadingWrap)
  // 防止遮罩滑动
  document.querySelector('.wrap-loading').addEventListener('touchmove', e => {
    e.preventDefault()
    e.stopPropagation()
  })
}

Loading.hide = () => {
  const loadingWrap = document.querySelector('.wrap-loading')
  if (loadingWrap) {
    document.body.removeChild(loadingWrap)
  }
}

// 实际上，Loading 被挂载在 Vue.prototype 上，通过 Vue.use() 在实例中执行
// 避免重复 install, 设立 flag
Loading.installed = false
Loading.install = function(Vue) {
  if (Loading.installed) return
  Vue.prototype.$loading = {}

  Vue.prototype.$loading.show = () => {
    // 如果页面有 loading，则不再重复执行
    if (document.querySelector('.wrap-loading')) return
    // 创建loading模版
    // when using runtime-only build of Vue, template compiler is not available
    // 创建实例，挂载到文档
    // html dom节点
    // const LoadingTpl = Vue.extend({
    //   template: `
    //     <div class="wrap-loading">
    //       <div class="loader"></div>
    //     </div>
    //   `
    // })
    // const loadingTemplate = new LoadingTpl().$mount().$el
    // document.body.appendChild(loadingTemplate)
    const loadingWrap = document.createElement('div')
    loadingWrap.className = 'wrap-loading'
    const innerLoader = document.createElement('div')
    innerLoader.className = 'loader'
    loadingWrap.appendChild(innerLoader)
    document.body.appendChild(loadingWrap)
    // 防止遮罩滑动
    const wrapper = document.querySelector('.wrap-loading')
    if (wrapper) {
      wrapper.addEventListener('touchmove', e => {
        e.preventDefault()
        e.stopPropagation()
      })
    }
    Loading.installed = true
  }

  Vue.prototype.$loading.hide = () => {
    const loadingWrap = document.querySelector('.wrap-loading')
    if (loadingWrap) {
      document.body.removeChild(loadingWrap)
    }
  }
}

export default Loading
