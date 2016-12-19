import VueRouter from 'vue-router';

import ProjectContainer from '../containers/Project/Project';

import HomeComponent from '../components/Home/Home';
import SisleyComponent from '../components/Sisley/Sisley';

Vue.use( VueRouter );

export default class Router extends VueRouter {

  constructor() {

    super({
      // base: '/',
      mode: 'history',
      routes: [
        {
          component: HomeComponent,
          name: 'home',
          path: '/',
        },
        {
          component: ProjectContainer,
          name: 'project',
          path: '/project',
          children: [
            { component: SisleyComponent, name: 'sisley', path: 'sisley' },
          ],
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
