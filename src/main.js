import domready from 'domready';

import Application from 'containers/Application/Application';
import template from 'containers/Application/application.html';
import AssetLoader from 'core/AssetLoader';
import Emitter from 'core/Emitter';
import Router from 'core/Router';
import CONSTANTS from 'config/constants';
import './stylesheets/main.styl';

class Main {

  constructor() {

    this.router = new Router();

    this.setEvents();
    this.loadAssets();
    this.start();
  }

  loadAssets() {
    this.assetLoader = AssetLoader;
  }

  setEvents() {
    this.emitter = Emitter;

    window.addEventListener( 'resize', ( e ) => { this.emitter.emit( CONSTANTS.EVENTS.RESIZE, e, window.innerWidth, window.innerHeight ); }, false );
    window.addEventListener( 'mousemove', ( event ) => { this.emitter.emit('global-mousemove', event); }, false );
  }

  start() {
    new Application({
      router: this.router,
    }).$mount('#application');
  }
}

domready(() => {

  new Main();
});
