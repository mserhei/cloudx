import localHeader from '../localization/localHeader.json';
import localHome from '../localization/localHome.json';
import localContacts from '../localization/localContacts.json';

import Header from '../../templates/Header/Header.hbs'
import Home from '../../templates/Home/Home.hbs';
import Contacts from '../../templates/Contacts/Contacts.hbs';
import Footer from '../../templates/Footer/Footer.hbs';

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
}

export {homePage, contactsPage};
