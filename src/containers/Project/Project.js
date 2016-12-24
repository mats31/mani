import assets from 'config/assets';
import Emitter from 'core/Emitter';
import CONSTANTS from 'config/constants';
import states from 'config/states';
import projects from 'config/projects';
import template from './project.html';
import './project.styl';
require('utils/ScrollToPlugin');


export default Vue.extend({

  template,

  data() {

    return {
      assets,
      projectList: null,
    };
  },

  created() {

    // console.log(this.$router.currentRoute.name);

    this.back = false;
    this.videoState = true;

    this.emitter = Emitter;

    this.getFooterProjects();

    this.emitter.emit( CONSTANTS.EVENTS.PROJECT_PAGE_CREATED );

    if (states.assetsLoaded) {
      this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, this.$router.currentRoute.name );
    } else {
      this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
    }
  },

  mounted() {

    // this.checkScroll();
    this.setProjectTitle(this.$router.currentRoute.name);
    this.createTls();
    // this.emitter = Emitter;
    // this.emitter.on('loader-end', this.displayHomepage);
    this.emitter.on( CONSTANTS.EVENTS.ASSETS_LOADED, this.setup.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.DOM_MOUSE_SCROLL, this.handleWheel.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.MOUSEWHEEL, this.handleWheel.bind(this) );
    this.emitter.on( CONSTANTS.EVENTS.SCROLL, this.handleScroll.bind(this) );

    if (states.isMobile) {
      TweenLite.to(
        this.$refs.projectContainer,
        1,
        {
          opacity: 1,
          ease: Power2.easeOut,
        }
      );
    }
  },

  methods: {

    setProjectTitle(id) {
      const title = projects.getProject(id).title;
      this.$refs.title.innerHTML = title;
    },

    setup() {

      this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, this.$router.currentRoute.name );
      this.getFooterProjects();
      this.checkScroll();
    },

    getFooterProjects() {

      const images = this.assets.images;
      const footerProjects = [];
      const projectList = projects.projectList;

      for (let i = 0; i < projectList.length; i += 1) {
        const id = `${projectList[i].id}-footer`;

        for (let j = 0; j < images.length; j += 1) {
          if ( id === images[j].id ) {
            const project = {
              id: projectList[i].id,
              title: projectList[i].title,
              subtitle: projectList[i].subtitle,
              src: images[j].media.src,
            };

            footerProjects.push(project);
          }
        }
      }

      this.projectList = footerProjects;
    },

    checkScroll() {
      setTimeout( () => {
        if (window.scrollY > 0) {
          this.intl.restart();
          this.videoState = false;
          TweenLite.to(
            this.$refs.projectContainer,
            1,
            {
              opacity: 1,
              ease: Power2.easeOut,
            }
          );
          document.body.className = 'project';
        }
      });
    },

    createTls() {
      const canvasContainer = document.querySelector( '.canvas' );
      const grid = this.$refs.grids.getElementsByTagName( 'div' );
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
          y: '-90px',
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
          top: '-60px',
          ease: Power2.easeOut,
        }
      )
      .fromTo(
        canvasContainer,
        0.5,
        {
          scale: 1,
          ease: Power2.easeOut,
        },
        {
          scale: 0.834,
          zIndex: 2,
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
          top: '0',
          onComplete: () => {
            TweenLite.to(
              this.$refs.projectContainer,
              0.15,
              {
                opacity: 1,
              }
            );
            document.body.className = 'project';
            this.back = true;
          },
        }
      );
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
          zIndex: 2,
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
            document.body.className = '';
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

    goToHome() {
      this.$router.push({ name: 'home' });
    },

    /* HANDLE */
    handleScroll() {
      if ( !this.videoState && window.scrollY < 1 ) {
        this.videoState = true;
        this.updateScroll( false );
      }
    },

    handleLogoClick() {
      this.outtl.restart();
      setTimeout( () => {
        window.scrollY = 0;
        this.goToHome();
      }, 1500);
    },

    handleAboutClick() {
      this.outtl.restart();
      setTimeout( () => {
        window.scrollY = 0;
        this.goToHome();
      }, 1500);
    },

    handleContactClick() {
      this.outtl.restart();
      setTimeout( () => {
        window.scrollY = 0;
        this.goToHome();
      }, 1500);
    },

    handleJournalClick() {
      this.outtl.restart();
      setTimeout( () => {
        window.scrollY = 0;
        this.goToHome();
      }, 1500);
    },

    handleProjectClick(id) {

      // this.inTl.reverse(0);
      // states.onProjectPage = true;
      // this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, id);

      // setTimeout( () => {

      this.setProjectTitle(id);
      this.emitter.emit( CONSTANTS.EVENTS.GO_TO_PROJECT, id );
      this.$router.push({ name: id });
      // }, 1500);
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
