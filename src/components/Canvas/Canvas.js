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
      index: 0,

      currentVideo: null,
      nextVideo: null,
      stateMask: false,

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
    this.emitter.on( CONSTANTS.EVENTS.RESIZE, this.onResize.bind(this) );
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
      this.canvas.setAttribute('ctx', '1');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');

      this.canvas2 = document.createElement( 'canvas' );
      this.canvas2.setAttribute('ctx', '2');
      this.canvas2.width = window.innerWidth;
      this.canvas2.height = window.innerHeight;
      this.ctx2 = this.canvas2.getContext('2d');

      this.$refs.container.appendChild(this.canvas);
      this.$refs.container.appendChild(this.canvas2);

      this.currentVideo = this.shortVideos[0].media;
      this.currentVideo.onended = this.currentVideoOnEnded.bind(this);
      this.currentVideo.play();

      this.nextVideo = this.shortVideos[1].media;
      this.nextVideo.onended = this.nextVideoOnEnded.bind(this);
    },

    // STATE --------------------------------------------

    clearCanvas() {
      if ( !this.stateMask ) {
        this.ctx2.clearRect( 0, 0, this.canvas.width, this.canvas.height );
      } else {
        this.ctx.clearRect( 0, 0, this.canvas2.width, this.canvas2.height );
      }
    },

    // EVENTS --------------------------------------------

    currentVideoOnEnded() {
      this.index = this.index === this.shortVideos.length - 1 ? 0 : this.index + 1;
      this.stateMask = !this.stateMask;

      this.maskWidth = 0;
      this.maskHeight = 0;

      this.canvas.style.zIndex = 0;
      this.canvas2.style.zIndex = 1;

      this.nextVideo = this.shortVideos[this.index].media;
      this.nextVideo.play();
      this.nextVideo.onended = this.nextVideoOnEnded.bind(this);

      setTimeout( this.clearCanvas.bind(this), 1500 );

      // debugger;
    },

    nextVideoOnEnded() {
      this.index = this.index === this.shortVideos.length - 1 ? 0 : this.index + 1;
      this.stateMask = !this.stateMask;

      this.maskWidth = 0;
      this.maskHeight = 0;

      this.canvas2.style.zIndex = 0;
      this.canvas.style.zIndex = 1;

      this.currentVideo = this.shortVideos[this.index].media;
      this.currentVideo.play();
      this.currentVideo.onended = this.currentVideoOnEnded.bind(this);

      setTimeout( this.clearCanvas.bind(this), 1500 );

      // debugger;
    },

    onResize( e, width, height ) {
      this.canvas.width = width;
      this.canvas.height = height;

      this.canvas2.width = width;
      this.canvas2.height = height;
    },

    // UPDATE --------------------------------------------

    animate() {
      raf(this.animate);

      const canvas = this.canvas;
      const canvas2 = this.canvas2;

      const currentVideo = this.currentVideo;
      const nextVideo = this.nextVideo;

      if ( !this.stateMask ) {

        this.ctx.save();
        this.drawMask( this.ctx );
        this.ctx.globalCompositeOperation = 'source-in';
        this.ctx.drawImage( currentVideo, 0, 0, currentVideo.videoWidth, currentVideo.videoHeight, 0, 0, canvas.width, canvas.height );
        this.ctx.restore();

      } else {

        this.ctx2.save();
        this.drawMask( this.ctx2 );
        this.ctx2.globalCompositeOperation = 'source-in';
        this.ctx2.drawImage( nextVideo, 0, 0, nextVideo.videoWidth, nextVideo.videoHeight, 0, 0, canvas2.width, canvas2.height );
        this.ctx2.restore();

      }

    },

    drawMask( ctx ) {
      const context = ctx;
      const x = context.canvas.width * 0.41640625;
      const x2 = context.canvas.width * 0.58333333333333;
      const x3 = x;
      const y = context.canvas.height;
      const y2 = y;
      const y3 = 0;
      let width = this.maskWidth = this.maskWidth + ( ( x - this.maskWidth ) * 0.1 );
      const width2 = width;
      width *= -1;
      const width3 = x2 - x;
      const height = context.canvas.height * -1;
      const height2 = height;
      const height3 = this.maskHeight = this.maskHeight + ( ( context.canvas.height - this.maskHeight ) * 0.1 );

      context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fillRect( x, y, width, height );

      context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fillRect( x2, y2, width2, height2 );

      context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fillRect( x3, y3, width3, height3 );
    },

  },

  components: {},
});
