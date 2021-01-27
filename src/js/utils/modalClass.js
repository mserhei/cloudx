import { measureAndFixScroll } from './preloader';
import authorize from '../../templates/login-modal.hbs';

const hbsFunctions = [authorize];

class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.scroll = '';
  }
  get oldScroll() {
    return measureAndFixScroll();
  }
  async openModal(event) {
    const index = event.target.dataset.modal;
    if (!index || !this.functions[index]) return;
    const markup = await this.functions[index](event);
    if (!markup) return;
    event.preventDefault();
    document.body.insertAdjacentHTML('afterbegin', markup);
    const modalRef = document.querySelector('div[data-close]');
    setTimeout(() => {
      modalRef.classList.add('opened');
    }, 100);
    this.scroll = this.oldScroll;
    document.body.style.overflow = 'hidden';
    modalRef.addEventListener('click', this.onClickCloseModal);
    window.addEventListener('keydown', this.onEscapeCloseModal);
  }
  closeModal() {
    const backdrop = document.querySelector('div[data-close]');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    backdrop.classList.remove('opened');
    setTimeout(() => {
      backdrop.remove();
      document.body.style.overflowY = 'scroll';
      document.body.style.paddingRight = this.scroll;
    }, 500);
  }
  onEscapeCloseModal(event) {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  }
  onClickCloseModal(event) {
    if (event.target.hasAttribute('data-close')) {
      event.preventDefault();
      this.closeModal();
    }
  }
}
const myModal = new Modal(hbsFunctions);

export default myModal;
