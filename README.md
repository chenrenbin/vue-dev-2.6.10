## 创建Vue类阶段

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