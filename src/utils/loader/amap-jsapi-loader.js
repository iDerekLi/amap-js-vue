import jsonp from 'http-jsonp';

let loadPromise = null;

export default function AMapJSAPILoader(url) {
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = new Promise((resolve, reject) => {
    if (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function'
    ) {
      jsonp({
        url,
        callbackProp: 'callback',
        callbackNamespase: '',
        callback: () => resolve(window.AMap),
        error: reject,
      });
    }
  });
  return loadPromise;
}
