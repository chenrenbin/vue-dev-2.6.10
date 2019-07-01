import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
//  $parent、$root、$children、$refs
//  $attrs、$listeners
// callHook(vm, 'beforeCreate')
// initInjections
// props、methods、data、computed、watch
// initProvide
// callHook(vm, 'created')
// vm.$mount(vm.$options.el)

stateMixin(Vue)
// $data、$props、$set、$delete、$watch

eventsMixin(Vue)
// $on、$once、$off、$emit

lifecycleMixin(Vue)
// _update、$forceUpdate、$destroy

renderMixin(Vue)
// $nextTick、_rende

export default Vue
