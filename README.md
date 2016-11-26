# rollup-plugin-ng-annotate
![Build Status](https://img.shields.io/travis/bornkiller/rollup-plugin-ng-annotate/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/rollup-plugin-ng-annotate/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/rollup-plugin-ng-annotate?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/rollup-plugin-ng-annotate.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/rollup-plugin-ng-annotate/dev-status.svg?style=flat)

Add AngularJS dependency injection annotations inspired by ng-annotate. 

## Usage
~~Extreme limitation to use the plugin, add annotation like below, and need `babel-plugin-transform-class-properties` support。~~

```json
{
  presets: ['es2015-rollup'],
  plugins: ["transform-class-properties"]
}
```

since `0.3.0`, I adjust the DI solution, because `Class` are transformed into normal function, class static property not used any more while `babel-plugin-transform-class-properties` unnecessary, so just config your `.babelrc` below: 

```json
{
  presets: ['es2015-rollup']
}
```

Add annotation comment like below:

```javascript
export /* @ngInject */ function HMRProvider() {
  // ...
}

export /* @ngInject */ function HMRStateProviderConfig($stateProvider, $hmrProvider) {
  // ...
}
```

```javascript
export class ReduxCoreController {
  /* @ngInject */
  constructor($ngRedux, $scope, $stateParams, taskActions) {
  }
}

export class ReduxAssistController {
  /* @ngInject */
  constructor($injector, $http) {
  }
}
```

## attention
It works fine in personal project, if any problem occur, just issue me.

## license
MIT
