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
      maskHeight: 0,
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
      this.nextVideo = this.shortVideos[1].media;
      this.nextVideo.play();
    },

    animate() {
      raf(this.animate);

      const canvas = this.canvas;
      const currentVideo = this.currentVideo;
      const nextVideo = this.nextVideo;

      this.ctx.save();

      this.drawMask( canvas );

      this.ctx.globalCompositeOperation = 'source-in';

      this.ctx.drawImage( nextVideo, 0, 0, nextVideo.videoWidth, nextVideo.videoHeight, 0, 0, canvas.width, canvas.height );

      this.ctx.restore();
    },

    drawMask( canvas ) {
      const x = canvas.width * 0.41640625;
      const x2 = canvas.width * 0.58333333333333;
      const x3 = x;
      const y = canvas.height;
      const y2 = y;
      const y3 = 0;
      let width = this.maskWidth = this.maskWidth + ( ( x - this.maskWidth ) * 0.1 );
      const width2 = width;
      width *= -1;
      const width3 = x2 - x;
      const height = canvas.height * -1;
      const height2 = height;
      const height3 = this.maskHeight = this.maskHeight + ( ( canvas.height - this.maskHeight ) * 0.1 );

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect( x, y, width, height );

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect( x2, y2, width2, height2 );

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect( x3, y3, width3, height3 );
    },

  },

  components: {},
});
