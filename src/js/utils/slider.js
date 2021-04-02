class Slider {
  constructor() {
    this.next = 1;
    this.timer = null;
    this.set = false;
    this.interval = 8000;
    this.forward = true;
  }
  get slider() {
    return document.getElementById('slider');
  }
  get slides() {
    return document.querySelectorAll('.hero-slider__slide');
  }
  get left() {
    return document.getElementById('slider_left');
  }
  get right() {
    return document.getElementById('slider_right');
  }
  get left0() {
    return document.getElementById('slider_left0');
  }
  get right0() {
    return document.getElementById('slider_right0');
  }
  get indicators() {
    return document.querySelector('.hero-slider__indicators');
  }
  start(onThis) {
    // if (this.timer) return;
    if (!onThis) {
      this.active = this.slides.length - 1;
      this.next = 1;
    }
    if (this.slides.length <= 1) {
      const arr = [this.left, this.right, this.left0, this.right0];
      arr.map(el => el.setAttribute('disabled', ''));
    }
    this.changeSlides();
    this.timer = setInterval(() => {
      if (this.slider && this.set) {
        this.changeSlides();
      }
    }, this.interval);
  }
  end() {
    clearInterval(this.timer);
    if (this.set) {
      this.timer = null;
    }
    this.set = false;
  }
  changeSlides() {
    if (!this.slider) {
      return this.end();
    }
    if (this.slides.length <= 1) return;
    this.set = true;
    const direction = this.forward ? 'right' : 'left';
    const other = this.forward ? 'left' : 'right';
    if (!this.indicators.children.length || !this.slides.length) return;
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'left', 'right');
      if (this.slides.length === 2) slide.classList.add(other);
      else slide.classList.add(direction);
      this.indicators.children[index].classList.remove('active');
    });
    if (this.forward) {
      this.active++;
      if (this.active === this.slides.length) this.active = 0;
      this.next = this.active + 1;
      if (this.next === this.slides.length) this.next = 0;
    } else {
      if (this.active === 0) this.active = this.slides.length;
      this.active--;
      this.next = this.active - 1;
      if (this.next === -1) this.next = this.slides.length - 1;
    }
    this.slides[this.next].classList.add(other);
    this.slides[this.next].classList.remove(direction);
    this.slides[this.active].classList.add('active');
    this.indicators.children[this.active].classList.add('active');
    this.forward = true;
    this.next = this.active + 1;
    if (this.next === this.slides.length) this.next = 0;
  }
  changeSlidesOnEvent(event) {
    event.preventDefault();
    if (this.slides.length <= 1) return;
    if (this.timer) {
      if (
        event.target === this.left ||
        event.target === this.left0 ||
        event.detail.dir === 'left'
      ) {
        this.forward = false;
      }
      if (
        event.target === this.right ||
        event.target === this.right0 ||
        event.detail.dir === 'right'
      ) {
        this.forward = true;
      }
      this.end();
      this.start(true);
      if (event.type === 'click') {
        this.left.setAttribute('aria-pressed', `${!this.forward}`);
        this.right.setAttribute('aria-pressed', `${this.forward}`);
      }
    }
  }
}

const slider = new Slider();
export default slider;

export { slider };
