/*实例化挂载

/*
*** instance/index.js --- 实例
*/
  function Vue (options) { this._init(options) }
  
  initMixin(Vue):
    Vue.prototype._init = function (options?: Object)
    
  stateMixin(Vue):
    Object.defineProperty(Vue.prototype, '$data', dataDef)
    Object.defineProperty(Vue.prototype, '$props', propsDef)
    Vue.prototype.$set = set
    Vue.prototype.$delete = del
    Vue.prototype.$watch = (expOrFn: string | Function, cb: any, options?: Object): Function
    
  eventsMixin(Vue):
    Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component
    Vue.prototype.$once = function (event: string, fn: Function): Component
    Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component
    Vue.prototype.$emit = function (event: string): Component
    
  lifecycleMixin(Vue):
    Vue.prototype._update = function (vnode: VNode, hydrating?: boolean)
    Vue.prototype.$forceUpdate = function ()
    Vue.prototype.$destroy = function ()
    
  renderMixin(Vue):
    installRenderHelpers(Vue.prototype):
      target._o = markOnce
      target._n = toNumber
      target._s = toString
      target._l = renderList
      target._t = renderSlot
      target._q = looseEqual
      target._i = looseIndexOf
      target._m = renderStatic
      target._f = resolveFilter
      target._k = checkKeyCodes
      target._b = bindObjectProps
      target._v = createTextVNode
      target._e = createEmptyVNode
      target._u = resolveScopedSlots
      target._g = bindObjectListeners
      target._d = bindDynamicKeys
      target._p = prependModifier
    Vue.prototype.$nextTick = function (fn: Function)
    Vue.prototype._render = function (): VNode


/*
*** core/index.js --- 核心
*/
  initGlobalAPI(Vue):
    Object.defineProperty(Vue, 'config', configDef)
    Vue.util = {warn, extend, mergeOptions, defineReactive}
    Vue.set = set
    Vue.delete = del
    Vue.nextTick = nextTick
    Vue.observable = <T>(obj: T): T => {observe(obj); return obj}
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => { // 'component', 'directive', 'filter'
        Vue.options[type + 's'] = Object.create(null)
    })
    Vue.options._base = Vue
    extend(Vue.options.components, builtInComponents)
    initUse(Vue): Vue.use = function (plugin: Function | Object)
    initMixin(Vue): Vue.mixin = function (mixin: Object)
    initExtend(Vue): Vue.cid = 0; Vue.extend = function (extendOptions: Object): Function 
    initAssetRegisters(Vue): 
      ASSET_TYPES.forEach(type => { // 'component', 'directive', 'filter'
       Vue[type] = function (
         id: string,
         definition: Function | Object
      ): Function | Object | void
  Object.defineProperty(Vue.prototype, '$isServer', {get: isServerRendering})
  Object.defineProperty(Vue.prototype, '$ssrContext',{get () {return this.$vnode && this.$vnode.ssrContext}})
  Object.defineProperty(Vue, 'FunctionalRenderContext', {value: FunctionalRenderContext})
  Vue.version = '__VERSION__'

/*
*** runtime/index.js --- 运行时
*/
  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp
  Vue.config.isReservedTag = isReservedTag
  Vue.config.isReservedAttr = isReservedAttr
  Vue.config.getTagNamespace = getTagNamespace
  Vue.config.isUnknownElement = isUnknownElement
  
  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives)
  extend(Vue.options.components, platformComponents)
  
  Vue.prototype.__patch__ = inBrowser ? patch : noop
  Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component

/*
*** entry-runtime-with-compiler.js --- 入口运行编译
*/
  Vue.prototype.$mount = function (el?: string | Element,hydrating?: boolean): Component
  Vue.compile = compileToFunctions


/*  执行
**  初始化阶段：this._init = function (options?: Object)
  const vm: Component = this
  vm._uid = uid++
  vm._isVue = true
  (options._isComponent):
    initInternalComponent(vm, options):
      const opts = vm.$options = Object.create(vm.constructor.options)
      // parentVnode = options._parentVnode
      opts.parent = options.parent
      opts._parentVnode = parentVnode
      const vnodeComponentOptions = parentVnode.componentOptions
      opts.propsData = vnodeComponentOptions.propsData
      opts._parentListeners = vnodeComponentOptions.listeners
      opts._renderChildren = vnodeComponentOptions.children
      opts._componentTag = vnodeComponentOptions.tag
      (options.render):
        opts.render = options.render
        opts.staticRenderFns = options.staticRenderFns
  (!options._isComponent):
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  (process.env.NODE_ENV !== 'production'): 
    initProxy (vm):
      vm._renderProxy = hasProxy ? new Proxy(vm, handlers) : vm
  (process.env.NODE_ENV === 'production'):
    vm._renderProxy = vm
    
  vm._self = vm
  initLifecycle(vm):
    const parent = vm.$options.parent
    (!options.abstract):
      (parent.$options.abstract): parent = parent.$parent
      parent.$children.push(vm)
      vm.$parent = parent
      vm.$root = parent ? parent.$root : vm
      vm.$children = []
      vm.$refs = {}
      vm._watcher = null
      vm._inactive = null
      vm._directInactive = false
      vm._isMounted = false
      vm._isDestroyed = false
      vm._isBeingDestroyed = false
        
  initEvents(vm):
    vm._events = Object.create(null)
    vm._hasHookEvent = false
    (vm.$options._parentListeners):
      updateComponentListeners(vm, listeners)
      
  initRender(vm):
    vm._vnode = null // the root of the child tree
    vm._staticTrees = null // v-once cached trees
    const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
    vm.$slots = resolveSlots(options._renderChildren, renderContext)
    vm.$scopedSlots = emptyObject
    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
    
  callHook(vm, 'beforeCreate')
  initInjections(vm): // resolve injections before data/props
    Object.keys(resolveInject(vm.$options.inject, vm)).forEach(key => {
      defineReactive(vm, key, result[key])
    })
    toggleObserving(true)
    
  initState(vm):
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch)
    }
    
  initProvide(vm): // resolve provide after data/props
   （vm.$options.provide): vm._provided = typeof provide === 'function' ? provide.call(vm) : provide
    
  callHook(vm, 'created')
  (vm.$options.el):
    vm.$mount(vm.$options.el)


**  构建阶段：vm.$mount(vm.$options.el) === function (el?: string | Element,hydrating?: boolean): Component
  (!options.render):
    'get-template': 
      options.render = render
      options.staticRenderFns = staticRenderFns
      
  mount.call(this, el, hydrating): // mountComponent(this, el, hydrating): Component
    vm.$el = el
    callHook(vm, 'beforeMount')
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate')
        }
      }
    }, true /* isRenderWatcher */)
    (vm.$vnode == null):
      vm._isMounted = true
      callHook(vm, 'mounted')

*/