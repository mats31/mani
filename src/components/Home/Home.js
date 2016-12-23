import assets from 'config/assets';
import projects from 'config/projects';
import CONSTANTS from 'config/constants';
import states from 'config/states';
import Emitter from 'core/Emitter';
import Router from 'core/Router';
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
      projectActive: false,
      previews: [],
    };
  },

  created() {

    this.introAnimateComplete = false;

    this.emitter = Emitter;
    this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.SLIDER_VIDEO_CHANGED, this.onSliderVideoChanged.bind(this) );
  },

  mounted() {

    this.createTls();
    if (states.assetsLoaded) this.setup();
  },

  methods: {

    setup() {

      this.createTls();
      this.assetsLoaded = true;

      this.setupProjects();
      this.inTl.play(0);

      states.assetsLoaded = true;
    },

    setupProjects() {
      const images = this.assets.images;
      const previews = [];
      const projectList = projects.projectList;

      for (let i = 0; i < projectList.length; i += 1) {
        const id = `${projectList[i].id}-preview`;

        for (let j = 0; j < images.length; j += 1) {
          if ( id === images[j].id ) {
            const preview = {
              id: projectList[i].id,
              title: projectList[i].title,
              subtitle: projectList[i].subtitle,
              src: images[j].media.src,
            };

            previews.push(preview);
          }
        }
      }

      this.previews = previews;
    },

    createTls() {

      this.inTl = new TimelineLite({ paused: true });
      this.outTl = new TimelineLite({ paused: true });

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
        this.$refs.right,
        0.5,
        {
          scaleX: 0.001,
        },
        {
          scaleX: 1,
          ease: Power2.easeOut,
        }
      )
      .fromTo(
        this.$refs.rightContainer,
        0.5,
        {
          scaleX: 0.01,
        },
        {
          scaleX: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .fromTo(
        this.$refs.viewProjects,
        0.5,
        {
          borderColor: '#fff',
          scaleX: 0.01,
        },
        {
          borderColor: '#505050',
          scaleX: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
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
      .fromTo(
        this.$refs.projects,
        0.5,
        {
          x: '-100%',
          scaleX: 0,
        },
        {
          x: '-101%',
          scaleX: 1,
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .fromTo(
        this.$refs.about,
        0.5,
        {
          scaleX: 0,
        },
        {
          x: '-101%',
          ease: Power2.easeOut,
        },
        '-=0.5'
      )
      .fromTo(
        this.$refs.contact,
        0.5,
        {
          scaleX: 0,
        },
        {
          x: '100%',
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
      .fromTo(
        this.$refs.projectBox,
        0.5,
        {
          y: '-52%',
          opacity: 0,
          ease: 'Power3.easeOut',
        },
        {
          y: '-50%',
          opacity: 1,
          ease: 'Power3.easeOut',
        },
        '-=0.5'
      )
      .to(
        this.$refs.contact,
        0.01,
        {
          scaleX: 1,
        },
      )
      .to(
        this.$refs.projects,
        0.01,
        {
          opacity: 1,
        },
      )
      .to(
        this.$refs.about,
        0.01,
        {
          scaleX: 1,
          onComplete: () => {
            this.introAnimateComplete = true;
          },
        },
      );

      /* Out Timeline */
      // this.outTl
      // .fromTo(
      //   this.$refs.left,
      //   0.5,
      //   {
      //     scaleY: 0,
      //   },
      //   {
      //     scaleY: 1,
      //     ease: Power2.easeOut,
      //   }
      // )
      // .fromTo(
      //   this.$refs.right,
      //   0.5,
      //   {
      //     scaleY: 0,
      //   },
      //   {
      //     scaleY: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.firstLine,
      //   0.5,
      //   {
      //     scaleY: 0,
      //   },
      //   {
      //     scaleY: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.secondLine,
      //   0.5,
      //   {
      //     scaleY: 0,
      //   },
      //   {
      //     scaleY: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.right,
      //   0.5,
      //   {
      //     scaleX: 0.01,
      //   },
      //   {
      //     scaleX: 1,
      //     ease: Power2.easeOut,
      //   }
      // )
      // .fromTo(
      //   this.$refs.rightContainer,
      //   0.5,
      //   {
      //     scaleX: 0.01,
      //   },
      //   {
      //     scaleX: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.viewProjects,
      //   0.5,
      //   {
      //     scaleX: 0.01,
      //   },
      //   {
      //     scaleX: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.title,
      //   0.5,
      //   {
      //     x: 0,
      //     scaleX: 0,
      //   },
      //   {
      //     x: '1px',
      //     scaleX: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.projects,
      //   0.5,
      //   {
      //     x: '-100%',
      //     scaleX: 0,
      //   },
      //   {
      //     x: '-101%',
      //     scaleX: 1,
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.about,
      //   0.5,
      //   {
      //     scaleX: 0,
      //   },
      //   {
      //     x: '-101%',
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .fromTo(
      //   this.$refs.contact,
      //   0.5,
      //   {
      //     scaleX: 0,
      //   },
      //   {
      //     x: '100%',
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .to(
      //   this.$refs.firstLine,
      //   0.5,
      //   {
      //     backgroundColor: '#414141',
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .to(
      //   this.$refs.secondLine,
      //   0.5,
      //   {
      //     backgroundColor: '#414141',
      //     ease: Power2.easeOut,
      //   },
      //   '-=0.5'
      // )
      // .to(
      //   this.$refs.contact,
      //   0.01,
      //   {
      //     scaleX: 1,
      //   },
      // )
      // .to(
      //   this.$refs.projects,
      //   0.01,
      //   {
      //     opacity: 1,
      //   },
      // )
      // .to(
      //   this.$refs.about,
      //   0.01,
      //   {
      //     scaleX: 1,
      //   },
      // );
    },

    /* HANDLES */

    handleButtonClick() {

      this.inTl.reverse(0);
      states.onProjectPage = true;
      // this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, states.currentProject );

      setTimeout( () => {

        this.$router.push({ name: states.currentProject });
      }, 1500);
    },

    handleProjectClick(id) {

      this.inTl.reverse(0);
      states.onProjectPage = true;
      // this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, id);

      setTimeout( () => {

        this.$router.push({ name: id });
      }, 1500);
    },

    handleProjectsClick() {

      if (this.projectActive) {
        TweenLite.to(
          this.$refs.projects,
          0.3,
          {
            x: '-100%',
            ease: 'Power2.easeOut',
            onComplete: () => {
              this.projectActive = false;
            },
          }
        );
      } else {
        TweenLite.to(
          this.$refs.projects,
          0.3,
          {
            x: '0%',
            ease: 'Power2.easeOut',
            onComplete: () => {
              this.projectActive = true;
            },
          }
        );
      }
    },

    handleProjectsEnter() {

      if (!states.isMobile) {
        this.projectActive = true;

        TweenLite.to(
          this.$refs.projects,
          0.3,
          {
            x: '0%',
            ease: 'Power2.easeOut',
          }
        );
      }
    },

    handleProjectsLeave() {

      if (!states.isMobile) {
        this.projectActive = false;

        TweenLite.to(
          this.$refs.projects,
          0.3,
          {
            x: '-100%',
            ease: 'Power2.easeOut',
          }
        );
      }
    },

    handleAboutEnter() {

      this.aboutActive = true;

      TweenLite.to(
        this.$refs.about,
        0.3,
        {
          x: '0%',
          ease: 'Power2.easeOut',
        }
      );
    },

    handleAboutLeave() {

      this.aboutActive = false;

      TweenLite.to(
        this.$refs.about,
        0.3,
        {
          x: '-101%',
          ease: 'Power2.easeOut',
        }
      );
    },

    handleContactEnter() {

      this.contactActive = true;

      TweenLite.to(
        this.$refs.contact,
        0.3,
        {
          x: '0%',
          ease: 'Power2.easeOut',
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
          ease: 'Power2.easeOut',
        }
      );
    },

    /* EVENTS */
    onSliderVideoChanged() {
      const project = projects.getProject(states.currentProject);

      if (this.introAnimateComplete) {

        TweenMax.to(
          this.$refs.projectBox,
          0.3,
          {
            y: '-52%',
            opacity: 0,
            ease: 'Power3.easeOut',
            onComplete: () => {
              this.$refs.projectBoxTitle.innerHTML = project.title;
              this.$refs.projectBoxSubtitle.innerHTML = project.subtitle;
            },
          }
        );

        TweenMax.to(
          this.$refs.projectBox,
          0.3,
          {
            delay: 0.3,
            y: '-50%',
            opacity: 1,
            ease: 'Power3.easeOut',
          }
        );
      } else {

        this.$refs.projectBoxTitle.innerHTML = project.title;
        this.$refs.projectBoxSubtitle.innerHTML = project.subtitle;
      }
    },
  },

  components: {},
});
