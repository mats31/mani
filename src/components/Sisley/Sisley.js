import assets from 'config/assets';
import CONSTANTS from 'config/constants';
import Emitter from 'core/Emitter';
import { TimelineLite, TweenLite } from 'gsap';

import './sisley.styl';

import template from './sisley.html';

export default Vue.extend({

  template,

  data() {

    return {
      aboutActive: false,
      assets,
      assetsLoaded: false,
      contactActive: false,
      projectActive: false,
      previews: [],
    };
  },

  created() {
    this.emitter = Emitter;
    this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
  },

  mounted() {
    this.createTls();
  },

  methods: {

    setup() {
      this.assetsLoaded = true;
    },

    createTls() {
      this.inTl = new TimelineLite({ paused: true });
    },

    /* EVENTS */
  },

  components: {},
});
