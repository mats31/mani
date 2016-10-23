import VueRouter from 'vue-router';

import HomeContainer from '../components/Home/Home';

Vue.use( VueRouter );

export default class Router extends VueRouter {

  constructor() {

    super({
      // base: '/',
      mode: 'history',
      routes: [
        {
          component: HomeContainer,
          name: 'home',
          path: '/',
        },
      ],
    });

    // this.path = '/';
    // this.firstRoute = true;
    // this.routeTimeout = null;

    // this.routes = [
    //   {
    //     component: { template: '<div>fvnfvnfkdc</div>' },
    //     name: 'home',
    //     path: '/',
    //   },
    //   // {
    //   //   component: ProjectContainer,
    //   //   name: 'project',
    //   //   path: '/project',
    //   //   children: [
    //   //     { component: OrangeComponent, name: 'orange', path: '/orange' },
    //   //   ],
    //   // },
    // ];
  }
}
