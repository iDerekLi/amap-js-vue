module.exports = function(api) {
  const { BABEL_MODULE, NODE_ENV } = process.env;
  const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test';
  api && api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs',
        },
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: false,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 2,
          helpers: true,
          regenerator: true,
          useESModules,
        },
      ],
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };
};
