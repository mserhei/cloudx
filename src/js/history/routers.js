import { fun1, fun2, fun3, fun4, fun5, fun6, fun7 } from './updatePageHistory';
import { lang } from './mainHistory';

const routers = [
  {
    get path() {
      return `/?lang=${lang.name}`;
    },
    page: 1,
    title: 'Home',
    component: fun1,
    meta: { auth: false },
  },
  {
    get path() {
      return `/about-us?lang=${lang.name}`;
    },
    page: 2,
    title: 'About Us',
    component: fun2,
    meta: { auth: false },
  },
  {
    get path() {
      return `/online-calc?lang=${lang.name}`;
    },
    page: 3,
    title: 'Online Calculator',
    component: fun3,
    meta: { auth: false },
  },
  {
    get path() {
      return `/for-partners?lang=${lang.name}`;
    },
    page: 4,
    title: 'For Partners',
    component: fun4,
    meta: { auth: false },
  },
  {
    get path() {
      return `/contacts?lang=${lang.name}`;
    },
    page: 5,
    title: 'Contacts',
    component: fun5,
    meta: { auth: false },
  },
  {
    get path() {
      return `/belgie?lang=${lang.name}`;
    },
    page: 6,
    title: 'Belgie',
    component: fun6,
    meta: { auth: false },
  },
  {
    get path() {
      return `/cabinet?lang=${lang.name}`;
    },
    page: 7,
    title: 'My Cabinet',
    component: fun7,
    meta: { auth: true },
  },
];

export default routers;
