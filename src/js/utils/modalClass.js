import { measureAndFixScroll } from './preloader';
import { renderModal } from '../pages/loginModal';
import { renderFeedback } from '../pages/feedbackModal';
import { renderOrder } from '../pages/calc';

const hbsFunctions = [renderModal, renderFeedback, renderOrder];

class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.scroll = '';
  }
  get isScrolled() {
    return document.body.offsetHeight === document.body.scrollHeight;
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
    document.body.insertAdjacentHTML('beforeend', markup);
    const modalRef = document.querySelector('div[data-close]');
    setTimeout(() => {
      modalRef.classList.add('opened');
    }, 100);
    modalRef.addEventListener('click', this.onClickCloseModal);
    window.addEventListener('keydown', this.onEscapeCloseModal);
    if (this.isScrolled) return;
    this.scroll = this.oldScroll;
    document.body.style.overflow = 'hidden';
  }
  closeModal() {
    const backdrop = document.querySelector('div[data-close]');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    backdrop.classList.remove('opened');
    setTimeout(() => {
      backdrop.remove();
      if (this.isScrolled) return;
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = this.scroll;
      const header = document.querySelector('.header');
      if (getComputedStyle(header).position === 'fixed') {
        header.style.paddingRight = this.scroll;
      }
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
