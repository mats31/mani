import domready from 'domready';

import Application from 'containers/Application/Application';
import template from 'containers/Application/application.html';
import AssetLoader from 'core/AssetLoader';
import Emitter from 'core/Emitter';
import Router from 'core/Router';
import CONSTANTS from 'config/constants';
import states from 'config/states';
import MobileDetect from 'mobile-detect';
import './stylesheets/main.styl';

class Main {

  constructor() {

    this.router = new Router();

    this.setup();
    this.setEvents();
    this.loadAssets();
    this.start();
  }

  setup() {
    this.md = new MobileDetect(window.navigator.userAgent);
    if (this.md.mobile()) {
      const html = document.getElementsByTagName( 'html' )[0];
      html.className += ' mobile';

      states.isMobile = true;
    }
  }

  loadAssets() {
    this.assetLoader = AssetLoader;
  }

  setEvents() {
    this.emitter = Emitter;

    window.addEventListener( 'resize', ( e ) => { this.emitter.emit( CONSTANTS.EVENTS.RESIZE, e, window.innerWidth, window.innerHeight ); }, false );
    window.addEventListener( 'DOMMouseScroll', ( e ) => { this.emitter.emit( CONSTANTS.EVENTS.DOM_MOUSE_SCROLL, e ); }, false );
    window.addEventListener( 'mousewheel', ( e ) => { this.emitter.emit( CONSTANTS.EVENTS.MOUSEWHEEL, e ); }, false );
    window.addEventListener( 'scroll', ( e ) => { this.emitter.emit( CONSTANTS.EVENTS.SCROLL, e ); }, false );
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
