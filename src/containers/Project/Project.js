import './project.styl';

import Emitter from 'core/Emitter';
import CONSTANTS from 'config/constants';

import states from 'config/states';

import template from './project.html';
require( 'utils/ScrollToPlugin' );

export default Vue.extend({

  template,

  data() {

    return {
      // displayHome: false,
    };
  },

  created() {

    this.back = false;
    this.videoState = true;

    document.body.className = 'project';
    this.emitter = Emitter;

    this.emitter.emit( CONSTANTS.EVENTS.PROJECT_PAGE_CREATED );
  },

  mounted() {
    this.createTls();
    // this.emitter = Emitter;
    // this.emitter.on('loader-end', this.displayHomepage);
    this.emitter.on( CONSTANTS.EVENTS.DOM_MOUSE_SCROLL, this.handleWheel.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.MOUSEWHEEL, this.handleWheel.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.SCROLL, this.handleScroll.bind(this) );
  },

  methods: {

    createTls() {
      const canvasContainer = document.querySelector( '.canvas' );
      const grid = this.$refs.projectContainer.querySelector( '.project-content .grid' );
      const header = this.$refs.header;
      const scrollBox = this.$refs.scrollBox;

      const mouse = scrollBox.querySelector( 'span:first-child' );
      const mouseText = scrollBox.querySelector( 'span:last-child' );

      this.intl = new TimelineMax({ paused: true });
      this.outtl = new TimelineMax({ paused: true });

      this.intl
      .to(
        mouse,
        0,
        {
          onComplete: () => {
            mouse.className = 'active';
            mouseText.innerHTML = 'Watch the video';
          },
        }
      )
      .to(
        mouse,
        0.5,
        {
          background: '#ffffff',
        }
      )
      .to(
        mouseText,
        0.5,
        {
          // y: '-930%',
          y: '-80px',
        },
        '-=0.5'
      )
      .to(
        scrollBox,
        0.5,
        {
          top: '60px',
        },
        '-=0.5'
      )
      .to(
        scrollBox,
        0.5,
        {
          top: '0px',
          ease: Power2.easeOut,
        }
      )
      .to(
        canvasContainer,
        0.5,
        {
          scale: 0.834,
          zIndex: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .to(
        header,
        0.5,
        {
          y: '+=0%',
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .to(
        grid,
        0.5,
        {
          top: '-115vh',
          onComplete: () => {
            document.body.className = '';
            this.back = true;
          },
        }
      )
      // .to(
      //   window,
      //   0.5,
      //   {
      //     scrollTo: { y: window.innerHeight * 0.5 },
      //     ease: Power2.easeOut,
      //   }
      // );

      this.outtl
      .to(
        grid,
        0.5,
        {
          top: '0vh',
          onComplete: () => {
            document.body.className = '';
            this.back = true;
          },
        }
      )
      .to(
        header,
        0.5,
        {
          y: '-=100',
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .to(
        canvasContainer,
        0.5,
        {
          scale: 1,
          zIndex: 0,
          ease: Power2.easeOut,
          onComplete: () => {
            mouse.className = '';
            mouseText.innerHTML = 'See more';
          },
        }
      )
      .to(
        mouseText,
        0.5,
        {
          y: '0%',
        },
        '-=0.5'
      )
      .to(
        mouse,
        0.5,
        {
          background: 'none',
          onComplete: () => {
            document.body.className = 'project';
            this.back = false;
          },
        }
      );
    },

    updateScroll( bool ) {
      if ( bool ) {
        this.intl.restart();
      } else {
        this.outtl.restart();
      }
    },

    /* HANDLE */
    handleScroll() {
      if ( !this.videoState && window.scrollY < 1 ) {
        this.videoState = true;
        this.updateScroll( false );
      }
    },

    handleWheel( e ) {
      if ( this.videoState ) {
        const deltaY = ( e.wheelDeltaY ) ? e.wheelDeltaY : e.detail;
        if ( deltaY < 0 ) {
          this.videoState = false;
          this.updateScroll( true );
        }
      }
    },

  },

  components: {},
});
