
import devConfig from './webpack.dev.config.js';
import prodConfig from './webpack.prod.config.js';

let config;

switch (process.env.npm_lifecycle_event) {
  case 'start':
    config = devConfig;
    break;
  case 'build':
    config = prodConfig;
    break;
  default:
    config = devConfig;
    break;
}

export default config;