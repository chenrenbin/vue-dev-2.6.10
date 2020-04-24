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
编译阶段---compileToFunctions(template, {...}, this)：
  if (!$options.render) {
    获取模板信息：
      idToTemplate(template) / template.innerHTML / getOuterHTML(el)
    compileToFunctions(template, {...}, this)---编译模板得到渲染函数：
      $options.render,
      $options.staticRenderFns 
  }

运行时阶段---mountComponent(this, el, hydrating)：
  ?$options.render,

  执行$options内所有生命周期钩子beforeMount:
    callHook(vm, 'beforeMount'),

  生成渲染watcher：
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

### 编译模板挂载render渲染函数
```
src\platforms\web\entry-runtime-with-compiler.js
>> {render,staticRenderFns} = compileToFunctions(template, {...}, this)

src\platforms\web\compiler\index.js
>> createCompiler(baseOptions)返回{ compile, compileToFunctions }

src\compiler\index.js
>> createCompilerCreator(baseCompile(template, option))返回createCompiler

src\compiler\create-compiler.js
>> 返回createCompiler(baseOptions)：
>>>>  初始化新compile(template,option,vm)
>>>>  返回{compile,compileToFunctions:createCompileToFunctionFn(compile)}

src\compiler\to-function.js
>> 返回res并缓存：{render,staticRenderFns}

PS：函数柯里化：
  createCompilerCreator(baseCompile(template, option))(baseOptions).compileToFunctions(template, {...}, this)

#### 模板编译器---baseCompile(template, option)
  1.解析器parse(template.trim(), options)
    HTML解析：属性,v-for,v-if,v-on...---使用了栈辅助标签的闭合
    文本解析：文档头,{{变量}}
    注释解析: <!--注释-->,IE注释<!***]>

  2.优化器optimize(ast, options)
    在AST中找出所有静态节点并打标记（static）
    在AST中找出所有静态根节点并打标记（staticRoot）
    除外：根节点只有一个文本节点; 一个没有子节点的静态节点

  3.生成器generate(ast, options)
    元素AST节点： _c(, , )
    文本AST节点： _v(“Hello”+_s(name))
    注释节点： _e(text)

  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  }
  
  PS: 正则表达式；栈的使用；递归算法；
```

### 生成渲染watcher，虚拟Dom渲染成真实Dom
```
src\core\observer\watcher.js
>> 执行updateComponent = () => {  vm._update(vm._render(), hydrating) }

src\core\instance\render.js
>> 得到虚拟DOM---vm._render()：vnode = render.call(vm._renderProxy, vm.$createElement)

src\core\instance\lifecycle.js
>> 更新/创建真实DOM---vm._update
    vm.__patch__：diff算法得出要变更的DOM，依赖options.el获取的页面元素发挥DOM接口挂载新DOM
    diff：vnode文本标签？直接替换：patch子元素(oldVnode和newVnode前后元素的对等/交叉对比；key的快捷查找判断)
      
  PS：各种递归操作
```

