import CanvasComponent from 'components/Canvas/Canvas';
import LoaderComponent from 'components/Loader/Loader';
import template from './application.html';

export default Vue.extend({

  template,

  emitterEvents: [],

  data() {

    return {};
  },

  mounted() {},

  methods: {},

  components: {
    'loader-component': LoaderComponent,
    'canvas-component': CanvasComponent,
  },

});
