## 第一阶段：创建Vue类

### /src/core/instance/index.js
```
Vue = {
  prototype:{
     _init,

    $data,
    $props,
    $set,
    $delete,
    $watch,

    $on,
    $once,
    $off,
    $emit,

    _update,
    $forceUpdate,
    $destroy,

    install runtime convenience helpers,
    $nextTick,
    _rende
  }
}
```

### /src/core/index.js
```
Vue = {
  config,
  util,
  set,
  delete,
  nextTick,
  observable,
  options,
  use,
  mixin,
  extend,

  component,
  directive,
  filter,

  prototype:{
    $isServer,
    $ssrContext,
  },

  FunctionalRenderContext,
  version
}
```
### /src/platforms/web/runtime/index.js
```
Vue = {
  config:{
    mustUseProp,
    isReservedTag,
    isReservedAttr,
    getTagNamespace,
    isUnknownElement
  },

  options:{
    directives,
    components
  }

  prototype:{
    __patch__,
    $mount
  }
}
```

### /src/platforms/web/entry-runtime-with-compiler.js
```
Vue = {
  $mount,
  compile
}
```

## 第二阶段：创建 Vue 实例

### 执行Vue.prototype._init()
```
vm = {
  _uid,
  _isVue,
  $options,
  
  initProxy---设置render函数的代理：
    _renderProx,

  _self,

  initLifecycle(vm)---初始化生命周期：
    $parent,
    $root,
    $children,
    $refs,
    _watcher,
    _inactive,
    _directInactive,
    _isMounted,
    _isDestroyed,
    _isBeingDestroyed,

  initEvents(vm)---注册事件(由父组件挂载到子组件)：
    _events,
    _hasHookEvent,
    init parent attached events,

  initRender(vm)---初始化渲染函数准备：
    _vnode,
    _staticTrees,
    $slots,
    $scopedSlots,
    _c,
    $createElement,
    $attrs,
    $listeners,

   callHook(vm, 'beforeCreate')---执行$options内所有生命周期钩子beforeCreate：
    vm.$emit('hook:' + hook),

   initInjections(vm)---初始化injections:
    defineReactive(vm, key, result[key]),
  
  initState(vm)---初始化状态(数据):
    defineReactive(props, key, value),
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm),
    observe(data, true /* asRootData */),
    defineComputed(vm, key, userDef) && watchers[key] = new Watcher(vm,getter || noop,noop,computedWatcherOptions),
    createWatcher(vm, key, handler)

  _provided,

  callHook(vm, 'created')---执行$options内所有生命周期钩子created：
    vm.$emit('hook:' + hook),

  挂载DOM：
    if (vm.$options.el) vm.$mount(vm.$options.el)
}
```

### 执行Vue.$mount(vm.$options.el)
```
vm = {
  if (!$options.render) {
    获取模板信息：
      idToTemplate(template) / template.innerHTML / getOuterHTML(el)
    compileToFunctions(template, {...}, this)---编译模板得到渲染函数：
      $options.render,
      $options.staticRenderFns 
  }

  $options.render,

  执行$options内所有生命周期钩子beforeMount:
    callHook(vm, 'beforeMount'),

  注册生命周期事件beforeUpdate监听：
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate')
        }
      }
    }, true /* isRenderWatcher */)
  
  _isMounted,

  执行$options内所有生命周期钩子mounted:
    callHook(vm, 'mounted')
}
```