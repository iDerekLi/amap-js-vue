import jsonp from 'http-jsonp';

let loadPromise = null;

export default function AMapUILoader(url) {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    if (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function'
    ) {
      const load = () => {
        loadPromise = null;
        const initAMap = () => {
          if (window.AMapUI) return window.AMapUI;
          window.initAMapUI();
          return window.AMapUI;
        };
        resolve(initAMap);
      };
      jsonp({
        url,
        load: load,
        error: reject,
      });
    }
  });
  return loadPromise;
}
