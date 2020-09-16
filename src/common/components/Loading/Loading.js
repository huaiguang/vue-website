import './loading.css'

const Loading = {}

Loading.show = () => {
  if (document.querySelector('.wrap-loading')) return
  const innerLoadingTpl = `
    <div class="loader"></div>
  `
  const wrapLoading = document.createElement('DIV')
  wrapLoading.className = 'wrap-loading'
  wrapLoading.innerHTML = innerLoadingTpl
  document.body.appendChild(wrapLoading)
  // 防止遮罩滑动
  document.querySelector('.wrap-loading').addEventListener('touchmove', e => {
    e.preventDefault()
    e.stopPropagation()
  })
}

Loading.hide = () => {
  const template = document.querySelector('.wrap-loading')
  if (template) {
    document.body.removeChild(template)
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
    const LoadingTpl = Vue.extend({
      template: `
        <div class="wrap-loading">
          <div class="loader"></div>
        </div>
      `
    })
    // 创建实例，挂载到文档
    // html dom节点
    const loadingTemplate = new LoadingTpl().$mount().$el
    document.body.appendChild(loadingTemplate)
    // 防止遮罩滑动
    document.querySelector('.wrap-loading').addEventListener('touchmove', e => {
      e.preventDefault()
      e.stopPropagation()
    })
    Loading.installed = true
  }

  Vue.prototype.$loading.hide = () => {
    const template = document.querySelector('.wrap-loading')
    if (template) {
      document.body.removeChild(template)
    }
  }
}

export default Loading
