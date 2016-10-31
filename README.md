# rollup-plugin-ng-annotate
Add AngularJS dependency injection annotations inspired by ng-annotate. 

## Usage
Extreme limitation to use the plugin, add annotation like below, and need `babel-plugin-transform-class-properties` support。

```json
{
  presets: ['es2015-rollup'],
  plugins: ["transform-class-properties"]
}
```

```javascript
export /* @ngInject */ function HMRProvider() {
  // ...
}

export /* @ngInject */ function HMRStateProviderConfig($stateProvider, $hmrProvider) {
  // ...
}
```

```javascript
export class OrderController {
  /* @ngInject */
  constructor($ngRedux, $scope, $stateParams, taskActions) {
  }
}
```

## Attention
+ still early development.
+ cache not supported.
