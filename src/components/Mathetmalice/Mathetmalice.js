import assets from 'config/assets';
import CONSTANTS from 'config/constants';
import Emitter from 'core/Emitter';
import ScrollMagic from 'scrollmagic';
require('animation.gsap');

import './mathetmalice.styl';

import template from './mathetmalice.html';

export default Vue.extend({

  template,

  data() {

    return {};
  },

  created() {},

  mounted() {
    this.generateTimelineMax();
    this.generateScrollTrigger();
    setTimeout( () => {
      this.inTl.play();
    }, 300 );
  },

  methods: {

    setup() {
      this.assetsLoaded = true;
    },

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
      /* Scroll Controller */
      this.controller = new ScrollMagic.Controller();

      /* Section 1 */
      const tween1 = new TimelineMax();
      const firstElements = this.$refs.section1.querySelectorAll( 'img' );
      for ( let i = 0; i < firstElements.length; i++ ) {
        const time = Math.random() * 0.5 + 0.2;
        tween1.fromTo(
          firstElements[i],
          time,
          {
            opacity: 0,
            y: Math.random() * -200,
          },
          {
            opacity: 1,
            y: 0,
            ease: SlowMo.easeOut,
          }, `-=${time}` );
      }

      const scene1 = new ScrollMagic.Scene({
        offset: 0,
        triggerElement: '.section-1',
      })
      .setTween( tween1 )
      .reverse( false )
      .addTo( this.controller );

      /* Section 2 */
      const tween2 = new TimelineMax();
      const secondElements = this.$refs.section2.querySelectorAll( 'img' );
      for ( let i = 0; i < secondElements.length; i++ ) {
        const time = 500;
        tween2.fromTo(
          secondElements[i],
          time,
          {
            x: Math.random() * 600 - 300,
          },
          {
            x: 0,
            ease: SlowMo.easeOut,
          }, `-=${time}` );
      }

      const scene2 = new ScrollMagic.Scene({
        duration: 500,
        offset: -300,
        triggerElement: '.section-2',
      })
      .setTween( tween2 )
      .reverse( false )
      .addTo( this.controller );

      /* Section 4 */
      const fourthElements = this.$refs.section4.querySelectorAll( '.container' );
      for ( let i = 0; i < fourthElements.length; i++ ) {
        const scene = new ScrollMagic.Scene({
          triggerElement: fourthElements[i],
        });

        const tween = TweenMax
          .fromTo(
          fourthElements[i],
          0.5,
          {
            opacity: 0,
            y: '+=100',
          },
          {
            opacity: 1,
            y: 0,
          }
        );

        scene
        .setTween( tween )
        .reverse( false )
        .addTo( this.controller );
      }

      /* Section 6 */
      const tween6 = TweenMax.staggerFromTo(
        this.$refs.section6.querySelectorAll( 'img' ),
        0.4,
        {
          opacity: 0,
          y: 200,
        },
        {
          opacity: 1,
          y: 0,
          ease: SlowMo.easeOut,
        }, 0.05 );

      const scene6 = new ScrollMagic.Scene({
        triggerElement: '.section-6',
      })
      .setTween( tween6 )
      .reverse( false )
      .addTo( this.controller );
    },

    setSectionSize() {
      const firstSection = this.$refs.section1;
      const imgs = firstSection.querySelectorAll( 'img' );
      const imgModel = imgs[imgs.length - 1];
      const height = imgModel.offsetHeight * 100 / 68.645640074212;

      // this.setState({
      //   heightSection: `${height}px`,
      // });
    },

    /* EVENTS */
  },

  components: {},
});
