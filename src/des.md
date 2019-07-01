/*实例化挂载

*instance/index.js
Vue.prototype._init

Object.defineProperty(Vue.prototype, '$data', dataDef)
Object.defineProperty(Vue.prototype, '$props', propsDef)
Vue.prototype.$set = set
Vue.prototype.$delete = del
Vue.prototype.$watch

Vue.prototype.$on
Vue.prototype.$once
Vue.prototype.$off
Vue.prototype.$emit

Vue.prototype._update
Vue.prototype.$forceUpdate
Vue.prototype.$destroy--callHook(vm, 'beforeDestroy')、callHook(vm, 'destroyed')

Vue.prototype._o、Vue.prototype._n...
Vue.prototype.$nextTick
Vue.prototype._render

**core/index.js
Object.defineProperty(Vue, 'config', configDef)
Vue.util、Vue.set、Vue.delete、Vue.nextTick、Vue.observable、Vue.options
Vue.use
Vue.mixin
Vue.extend
Vue['component'/'directive'/'filter']

Object.defineProperty(Vue.prototype, '$isServer', {get: isServerRendering})
Object.defineProperty(Vue.prototype, '$ssrContext',{get: })
Object.defineProperty(Vue, 'FunctionalRenderContext', {value: FunctionalRenderContext})
Vue.version = '__VERSION__'

***runtime/index.js
Vue.config扩展
// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)
Vue.prototype.__patch__ = inBrowser ? patch : noop
Vue.prototype.$mount

****entry-runtime-with-compiler.js
Vue.prototype.$mount扩展
Vue.compile

*/

/*  执行
**  初始化阶段：this._init

vm._uid、vm._isVue
vm.$options
vm._renderProxy
vm._self

vm.$parent、vm.$root（from vm.$options）
vm.$children、vm.$refs、vm._watcher、vm._inactive、vm._directInactive、vm._isMounted、vm._isDestroyed、vm._isBeingDestroyed

vm._events、vm._hasHookEvent

vm._vnode、vm._staticTrees、vm.$slots、vm.$scopedSlots、vm._c、vm.$createElement
defineReactive(vm, '$attrs')、defineReactive(vm, '$listeners')

callHook(vm, 'beforeCreate')

initInjections(vm)--defineReactive(vm, key, result[key])

defineReactive(props, key, value)
vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
observe(data, true /* asRootData */)
defineComputed---Object.defineProperty(target, key, sharedPropertyDefinition)
initWatch---createWatcher(vm, key, handler[i])

initProvide---vm._provided

callHook(vm, 'created')

vm.$mount(vm.$options.el)

**  构建阶段：vm.$mount(vm.$options.el)

callHook(vm, 'beforeMount')

new Watcher(vm, updateComponent, noop, {})--callHook(vm, 'beforeUpdate')

callHook(vm, 'mounted')


*/