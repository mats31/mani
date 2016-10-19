import Emitter from 'core/Emitter';
import raf from 'raf';
import { TimelineLite } from 'gsap';

import CONSTANTS from 'config/constants';
import assets from 'config/assets';

import './canvas.styl';
import template from './canvas.html';

export default Vue.extend({

  template,

  assetLoaded() {

  },

  data() {

    return {
      currentVideo: null,
      nextVideo: null,

      longVideos: [],
      shortVideos: [],

      maskWidth: 0,
    };
  },


  init() {},

  created() {
    this.emitter = Emitter;
    this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
  },

  mounted() {},

  methods: {

    setup() {
      this.getVideos();
      this.createCanvas();

      this.animate();
    },

    getVideos() {
      for ( let i = 0; i < assets.videos.length; i += 1 ) {

        assets.videos[i].media.muted = true;

        if ( assets.videos[i].id.indexOf('long') === -1 ) {
          this.shortVideos.push( assets.videos[i] );
        } else {
          this.longVideos.push( assets.videos[i] );
        }
      }
    },

    createCanvas() {
      this.canvas = document.createElement( 'canvas' );
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');

      this.$refs.container.appendChild(this.canvas);

      this.currentVideo = this.shortVideos[0].media;
      this.currentVideo.play();
      this.currentVideo = this.shortVideos[1].media;
    },

    animate() {
      raf(this.animate);

      const canvas = this.canvas;
      const currentVideo = this.currentVideo;

      this.drawMask( canvas );

    //   this.ctx.drawImage( currentVideo, 0, 0, currentVideo.videoWidth, currentVideo.videoHeight, 0, 0, canvas.width, canvas.height );
    },

    drawMask( canvas ) {
      const x = canvas.width * 0.41640625;
      const y = canvas.height;
      const width = this.maskWidth = ( this.maskWidth + ( ( this.maskWidth - x ) * 0.1 ) ) * -1;
      const height = canvas.height * -1;

    //   console.log(width);

      this.ctx.fillStyle = 'white';
      this.ctx.fillRect( x, y, width, height );
    },

  },

  components: {},
});
