import assets from 'config/assets';
import projects from 'config/projects';
import CONSTANTS from 'config/constants';
import Emitter from 'core/Emitter';
import { TimelineLite, TweenLite } from 'gsap';

import './home.styl';

import template from './home.html';

export default Vue.extend({

  template,

  data() {

    return {
      aboutActive: false,
      assets,
      assetsLoaded: false,
      contactActive: false,
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

      this.setupProjects();
      this.inTl.play(0);
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

    createTls() {
      this.inTl = new TimelineLite({paused: true});

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
        }
      )
      .fromTo(
        this.$refs.right,
        0.5,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .fromTo(
        this.$refs.firstLine,
        0.5,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .fromTo(
        this.$refs.secondLine,
        0.5,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
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
        }
      )
      .fromTo(
        this.$refs.title,
        0.5,
        {
          x: 0,
          scaleX: 0,
        },
        {
          x: '1px',
          scaleX: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .to(
        this.$refs.firstLine,
        0.5,
        {
          backgroundColor: '#414141',
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .to(
        this.$refs.secondLine,
        0.5,
        {
          backgroundColor: '#414141',
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
    },

    /* EVENTS */
    handleAboutEnter() {

      this.aboutActive = true;

      TweenLite.to(
        this.$refs.about,
        0.3,
        {
          x: '0%',
        }
      );
    },

    handleAboutLeave() {

      this.aboutActive = false;

      TweenLite.to(
        this.$refs.about,
        0.3,
        {
          x: '-100%',
        }
      );
    },

    handleContactEnter() {

      this.contactActive = true;

      TweenLite.to(
        this.$refs.contact,
        0.3,
        {
          x: '-57.7%',
        }
      );
    },

    handleContactLeave() {

      this.contactActive = false;

      TweenLite.to(
        this.$refs.contact,
        0.3,
        {
          x: '100%',
        }
      );
    },
  },

  components: {},
});
