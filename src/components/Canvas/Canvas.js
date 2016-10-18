import raf from 'raf';
import { TimelineLite } from 'gsap';

import './canvas.styl';
import template from './canvas.html';

export default Vue.extend({

  template,

  assetLoaded() {

  },

  data() {

    return {};
  },


  init() {

  },

  created() {},

  mounted() {},

  methods: {

    animate() {
      const requestanimationframe = raf(this.animate);
    },

    inTl() {
      const tl = new TimelineLite();

      tl.to(
        this.$refs.percent,
        2,
        {
          opacity: 1,
        }
      ).to(
        this.$refs.firstline,
        2,
        {
          scaleX: 1,
          onComplete: () => {
            this.animate();
          },
        },
        '-=2'
      );
    },

    outTl() {
      const tl = new TimelineLite();

      this.$refs.secondline.style = 'transition: intial;';

      tl.to(
        this.$refs.percent,
        0.5,
        {
          opacity: 0,
        }
      ).fromTo(
        this.$refs.secondline,
        0.25,
        {
          scaleX: 1,
        },
        {
          scaleX: 0,
          onComplete: this.removeLoader,
        },
        '-=0.25'
      );
    },

  },

  components: {},
});
