import VueRouter from 'vue-router';

import HomeContainer from '../containers/Home/Home';

Vue.use( VueRouter );

export default class Router extends VueRouter {

  constructor() {

    super({
      base: '/',
      mode: 'history',
    });

    this.path = '/';
    this.firstRoute = true;
    this.routeTimeout = null;

    this.routes = [
      {
        component: HomeContainer,
        name: 'home',
        path: '/',
      },
      // {
      //   component: ProjectContainer,
      //   name: 'project',
      //   path: '/project',
      //   children: [
      //     { component: OrangeComponent, name: 'orange', path: '/orange' },
      //   ],
      // },
    ];
  }
}
