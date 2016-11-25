import { HMRProvider, HMRStateProvider } from './hmr.provider';
import { ReduxCoreController, ReduxAssistController} from './redux.controller';

angular.module('demo', [])
  .provider(HMRProvider)
  .config(HMRStateProvider)
  // .controller('ReduxCoreController', ReduxCoreController)
  // .controller('ReduxAssistController', ReduxAssistController);