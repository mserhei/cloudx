import { fun1, fun2, fun3, fun4, fun5, fun6 } from './updatePageHistory';

const routers = [
  {
    path: '/',
    page: 1,
    title: 'Home',
    component: fun1,
    meta: { auth: false },
  },
  {
    path: '/about-us',
    page: 2,
    title: 'About Us',
    component: fun2,
    meta: { auth: false },
  },
  {
    path: '/online-calc',
    page: 3,
    title: 'Online Calculator',
    component: fun3,
    meta: { auth: false },
  },
  {
    path: '/for-partners',
    page: 4,
    title: 'For Partners',
    component: fun4,
    meta: { auth: false },
  },
  {
    path: '/contacts',
    page: 5,
    title: 'Contacts',
    component: fun5,
    meta: { auth: false },
  },
  {
    path: '/cabinet',
    page: 3,
    title: 'My Cabinet',
    component: fun6,
    meta: { auth: true },
  },
];

export default routers;
