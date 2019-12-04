import { createBEM } from '../utils/create/bem';
import config from '../config';
import AMapJSAPILoader from '../utils/loader/amap-jsapi-loader';
import AMapUILoader from '../utils/loader/amap-ui-loader';

const bem = createBEM('am-map');

export default {
  name: 'AmMap',
  props: {
    getContainer: {
      type: [String, Function],
    },
    initMapOptions: {
      type: Object,
      deafult: () => ({}),
    },
  },
  provide() {
    return {
      $maproot: this,
    };
  },
  data() {
    return {
      config: config(),
      isShowDefaultContainer: true,
      map: null,
    };
  },
  computed: {
    __mapComponent: () => !0,
  },
  created() {
    this.initStatus = null;
    this.readyHooks = [];
    this.errorHooks = [];
    this.isShowDefaultContainer = !this.getContainer;
    this.initStatus = this.init();
  },
  mounted() {
    // this.injectHook();
  },
  beforeDestroy() {
    this.initStatus = null;
  },
  methods: {
    createMap() {
      let container = null;
      if (this.isShowDefaultContainer) {
        container = this.$refs.container;
      } else {
        container =
          typeof this.getContainer === 'function'
            ? this.getContainer()
            : document.querySelector(this.getContainer);
      }
      container.classList.add(bem('container'));
      this.map = new this.AMap.Map(container, this.initMapOptions);
    },
    injectHook() {
      while (this.readyHooks.length) {
        const hook = this.readyHooks.shift();
        this.ready(hook);
      }
      while (this.errorHooks.length) {
        const hook = this.errorHooks.shift();
        this.error(hook);
      }
    },
    ready(cb) {
      this.initStatus === null ? this.readyHooks.push(cb) : this.initStatus.then(cb);
    },
    error(cb) {
      this.initStatus === null ? this.errorHooks.push(cb) : this.initStatus.catch(cb);
    },
    async installAPI() {
      const AMap = await AMapJSAPILoader(this.config.AMap);
      this.AMap = AMap;
      if (this.config.AMapUI) {
        const initAMapUI = await AMapUILoader(this.config.AMapUI);
        const AMapUI = initAMapUI();
        this.AMapUI = AMapUI;
      }
      return;
    },
    init() {
      return new Promise(async (ready, error) => {
        try {
          await this.installAPI();
          if (this.initStatus === null) return;
          this.createMap();
          ready(this);
        } catch (e) {
          error(e);
        }
      });
    },
  },
  render() {
    return (
      <div class={bem()}>
        {this.isShowDefaultContainer ? <div ref="container" class={bem('container')}></div> : ''}
        {this.$slots.default}
      </div>
    );
  },
};
