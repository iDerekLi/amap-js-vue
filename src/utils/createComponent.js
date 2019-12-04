function mergeMixinsHook(hookName, options, hooks = []) {
  if (options.mixins) {
    options.mixins.forEach(item => mergeMixinsHook(hookName, item, hooks));
  }
  options[hookName] && hooks.push(options[hookName]);
  return hooks;
}

function callHookReady(vm) {
  vm.$maproot.ready(() => {
    const opt = vm.constructor.options;
    const hooks = opt.ready;
    for (let i = 0, len = hooks.length; i < len; i++) {
      hooks[i] && hooks[i].call(vm);
    }
    vm.$emit('hook:ready');
  });
}

const register = {
  inject: ['$maproot'],
  beforeCreate() {
    if (!this.constructor[`__isInjectReadyHook`]) {
      const constr = this.constructor;
      const extOpt = constr.extendOptions;
      const hooks = mergeMixinsHook('ready', extOpt);
      constr.options['ready'] = hooks;
      this.constructor[`__isInjectReadyHook`] = !0;
    }
    this.$once('hook:mounted', () => callHookReady(this));
  },
  computed: {
    __mapComponent: () => !0,
  },
};

export default function createComponent(options = {}) {
  const { mixins = [] } = options;
  options.mixins = [register, ...mixins];
  options.install = function(Vue) {
    Vue.component(options.name, options);
  };
  return options;
}
