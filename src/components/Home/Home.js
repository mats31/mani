import assets from 'config/assets';
import projects from 'config/projects';
import CONSTANTS from 'config/constants';
import Emitter from 'core/Emitter';
import { TimelineLite } from 'gsap';

import './home.styl';

import template from './home.html';

export default Vue.extend({

  template,

  data() {

    return {
      assets,
      assetsLoaded: false,
      previews: [],
    };
  },

  created() {
    this.emitter = Emitter;
    this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
  },

  mounted() {
    this.inTl();
  },

  methods: {

    setup() {
      this.assetsLoaded = true;

      this.setupProjects();
    },

    setupProjects() {
      const images = this.assets.images;
      const previews = [];

      for (let i = 0; i < projects.length; i += 1) {
        const id = `${projects[i].id}-preview`;

        for (let j = 0; j < images.length; j += 1) {
          if ( id === images[j].id ) {
            console.log(images[j].media);
            const preview = {
              id: projects[i].id,
              title: projects[i].title,
              subtitle: projects[i].subtitle,
              src: images[j].media.src,
            };

            previews.push(preview);
          }
        }
      }

      this.previews = previews;
    },

    inTl() {
      this.inTl = new TimelineLite();

      this.inTl
      .fromTo(
        this.$refs.left,
        0.5,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: Power2.easeOut,
        },
      )
      .fromTo(
        this.$refs.viewProjects,
        0.5,
        {
          scaleX: 0.01,
        },
        {
          scaleX: 1,
          ease: Power2.easeOut,
        },
      )

    },
  },

  components: {},
});
