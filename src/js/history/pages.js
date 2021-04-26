import localHeader from '../localization/localHeader.json';
import localHome from '../localization/localHome.json';
import localContacts from '../localization/localContacts.json';
import localPartners from '../localization/localPartners.json';
import localAbout from '../localization/localAbout.json';

import Header from '../../templates/Header/Header.hbs'
import Home from '../../templates/Home/Home.hbs';
import Contacts from '../../templates/Contacts/Contacts.hbs';
import Footer from '../../templates/Footer/Footer.hbs';
import Partners from '../../templates/For-partners/For-partners.hbs';
import About from '../../templates/About/About.hbs';

import {lang} from './routs';

const header = document.getElementById('header');
const root = document.getElementById('root');
const footer = document.getElementById('footer');

function homePage () {
  header.innerHTML = Header(localHeader[lang]);
  root.innerHTML = Home(localHome[lang]);
  footer.innerHTML = Footer();
}

function contactsPage () {
  header.innerHTML = Header(localHeader[lang]);
  root.innerHTML = Contacts(localContacts[lang]);
  footer.innerHTML = Footer();
}

function partnersPage () {
  header.innerHTML = Header(localHeader[lang]);
  root.innerHTML = Partners(localPartners[lang]);
  footer.innerHTML = Footer();
}

function aboutPage () {
  header.innerHTML = Header(localHeader[lang]);
  root.innerHTML = About(localAbout[lang]);
  footer.innerHTML = Footer();
}

export {homePage, contactsPage, partnersPage, aboutPage};
