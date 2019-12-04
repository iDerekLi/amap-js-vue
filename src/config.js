const DefaultConfig = {
  /**
   * AMap [String]  AMapJSAPI请求地址(jsonp请求)
   * @default: Object
   * @example:
   * String = 'https://webapi.amap.com/maps?key=您申请的高德key值&v=1.4.15&plugin=[]'
   */
  AMap: 'https://webapi.amap.com/maps?key=您申请的高德key值&v=1.4.15&plugin=[]',
  /**
   * AMapUI [false|String]  异步AMapUIAPI请求地址
   * @default: false
   * @example:
   * String = 'https://webapi.amap.com/ui/1.0/main-async.js',
   */
  AMapUI: false,
};

const AMAP_CONFIG = {};

function config(config) {
  if (!config && !0) return AMAP_CONFIG;
  const conf = config || {};

  conf.AMap && (AMAP_CONFIG.AMap = conf.AMap);

  conf.AMapUI && (AMAP_CONFIG.AMapUI = conf.AMapUI);

  return AMAP_CONFIG;
}

config(DefaultConfig);

export default config;
