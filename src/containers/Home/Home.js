import Emitter from 'core/Emitter';

import './home.styl';

import template from './home.html';

export default Vue.extend({

  template,

  data() {

    return {
      // displayHome: false,
    };
  },

  created() {

  },

  mounted() {
    this.emitter = Emitter;
    // this.emitter.on('loader-end', this.displayHomepage);
  },

  methods: {

    // displayHomepage() {
    //   this.displayHome = true;
    // },

  },

  components: {},
});
