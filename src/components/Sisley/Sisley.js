import assets from 'config/assets';
import CONSTANTS from 'config/constants';
import Emitter from 'core/Emitter';
import ScrollMagic from 'scrollmagic';
require('animation.gsap');

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
    this.generateTimelineMax();
    this.generateScrollTrigger();
    setTimeout( () => {
      this.inTl.play();
    }, 300 );
  },

  methods: {

    generateTimelineMax() {
      // const grids = this.$refs.grids.querySelectorAll( 'div' );
      const descriptions = this.$refs.description.querySelectorAll( 'div' );

      this.inTl = new TimelineMax({ paused: true });

      this.inTl
      // .staggerFromTo(
      //   grids,
      //   5,
      //   {
      //     height: '0%',
      //   },
      //   {
      //     height: '100%',
      //   }
      // )
      .fromTo(
        descriptions,
        1,
        {
          opacity: 0,
          y: '-100%',
        },
        {
          opacity: 1,
          y: '0%',
          ease: Power2.easeOut,
        },
        '-=4.5'
      );
    },

    generateScrollTrigger() {
      this.controller = new ScrollMagic.Controller();
      /* Section 1 */
      const tween1 = TweenMax.staggerFromTo(
        this.$refs.section1.querySelectorAll( 'img' ),
        0.4,
        {
          opacity: 0,
          y: -200,
        },
        {
          opacity: 1,
          y: 0,
          ease: SlowMo.easeOut,
        }, 0.05 );

      const scene1 = new ScrollMagic.Scene({
        triggerElement: '.section-1',
      })
      .setTween( tween1 )
      .reverse( false )
      .addTo( this.controller );

      /* Section 3 & 4 */
      const tween3 = TweenMax.staggerFromTo(
        this.$refs.section3.querySelectorAll( 'img' ),
        0.4,
        {
          opacity: 0,
          y: -200,
        },
        {
          opacity: 1,
          y: 0,
          ease: SlowMo.easeOut,
        }, 0.2 );

      const tween4 = TweenMax.staggerFromTo(
        this.$refs.section4.querySelectorAll( 'img' ),
        0.4,
        {
          opacity: 0,
          y: -200,
        },
        {
          opacity: 1,
          y: 0,
          ease: SlowMo.easeOut,
        }, 0.2 );

      const scene3 = new ScrollMagic.Scene({
        triggerElement: '.section-3',
      })
      .setTween( tween3 )
      .reverse( false )
      .addTo( this.controller );

      const scene4 = new ScrollMagic.Scene({
        triggerElement: '.section-4',
      })
      .setTween( tween4 )
      .reverse( false )
      .addTo( this.controller );
    },

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
