import {Aurelia} from 'aurelia-framework'
import { PLATFORM } from 'aurelia-pal';
import environment from './environment';
import 'whatwg-fetch';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'mdbootstrap';
import 'velocity-animate';
import 'velocity';
import 'custom-scrollbar';
import 'jquery-visible';
import 'ie10-viewport';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()    
    .feature('resources')
    .plugin('aurelia-dialog')
    .plugin('aurelia-validation')
    .plugin("aurelia-animator-css")
    .feature('resources')      
    .plugin('aurelia-api', config => {
      config.registerEndpoint('apiAddress', environment.apiAddress);
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

   aurelia.start().then(() => aurelia.setRoot());
}
