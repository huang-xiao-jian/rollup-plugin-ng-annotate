# rollup-plugin-ng-annotate
![Build Status](https://img.shields.io/travis/bornkiller/rollup-plugin-ng-annotate/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/bornkiller/rollup-plugin-ng-annotate/badge.svg?branch=master)](https://coveralls.io/github/bornkiller/rollup-plugin-ng-annotate?branch=master)
![Package Dependency](https://david-dm.org/bornkiller/rollup-plugin-ng-annotate.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/rollup-plugin-ng-annotate/dev-status.svg?style=flat)

Add AngularJS dependency injection annotations inspired by ng-annotate.
 
## Deprecated
ng-annotate with regular expression smell bad, just use [babel-plugin-angularjs-annotate](https://www.npmjs.com/package/babel-plugin-angularjs-annotate). 

## Usage
just config your `.babelrc` below: 

```
{
  presets: ['env']
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

## Attention
It works fine in personal project, if any problem occur, just issue me.

## license
MIT
