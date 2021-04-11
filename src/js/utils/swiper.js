function addSwipeEvent(window, document) {
  'use strict';

  // patch CustomEvent to allow constructor creation (IE/Chrome)
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      };

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail,
      );
      return evt;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('touchend', handleTouchEnd, false);

  var xDown = null;
  var yDown = null;
  var xDiff = null;
  var yDiff = null;
  var timeDown = null;
  var startEl = null;

  function handleTouchEnd(e) {
    // if the user released on a different target, cancel!
    if (startEl !== e.target) return;

    var swipeThreshold = parseInt(
      getNearestAttribute(startEl, 'data-swipe-threshold', '20'),
      10,
    ); // default 20px
    var swipeTimeout = parseInt(
      getNearestAttribute(startEl, 'data-swipe-timeout', '500'),
      10,
    ); // default 500ms
    var timeDiff = Date.now() - timeDown;
    var eventType = '';
    var changedTouches = e.changedTouches || e.touches || [];

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        } else {
          eventType = 'swiped-right';
        }
      }
    } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
      if (yDiff > 0) {
        eventType = 'swiped-up';
      } else {
        eventType = 'swiped-down';
      }
    }

    if (eventType !== '') {
      var eventData = {
        dir: eventType.replace(/swiped-/, ''),
        xStart: parseInt(xDown, 10),
        xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
        yStart: parseInt(yDown, 10),
        yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10),
      };

      // fire `swiped` event event on the element that started the swipe
      startEl.dispatchEvent(
        new CustomEvent('swiped', {
          bubbles: true,
          cancelable: true,
          detail: eventData,
        }),
      );

      // fire `swiped-dir` event on the element that started the swipe
      startEl.dispatchEvent(
        new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: eventData,
        }),
      );
    }

    // reset values
    xDown = null;
    yDown = null;
    timeDown = null;
  }

  function handleTouchStart(e) {
    // if the element has data-swipe-ignore="true" we stop listening for swipe events
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

    startEl = e.target;

    timeDown = Date.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
  }

  /**
   * Records location diff in px on touchmove event
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchMove(e) {
    if (!xDown || !yDown) return;

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  }

  function getNearestAttribute(el, attributeName, defaultValue) {
    // walk up the dom tree looking for data-action and data-trigger
    while (el && el !== document.documentElement) {
      var attributeValue = el.getAttribute(attributeName);

      if (attributeValue) {
        return attributeValue;
      }

      el = el.parentNode;
    }

    return defaultValue;
  }
}

class Swiper {
  constructor(slider, slide, indicators) {
    this.sliderName = slider;
    this.slideName = slide;
    this.indicatorsName = indicators;
    this.interval = 4000;
    this.timer = null;
    this.index = 0;
  }
  get slider() {
    return document.getElementById(this.sliderName);
  }
  get slide() {
    return document.getElementById(this.slideName);
  }
  get indicators() {
    return document.querySelectorAll(this.indicatorsName);
  }
  start() {
    this.clear();
  }
  clear() {
    this.end();
    this.timer = setInterval(() => {
      if (this.slider) {
        this.slideLeft();
      }
    }, this.interval);
  }
  end() {
    clearInterval(this.timer);
    this.timer = null;
  }
  beforeSlide() {
    const { x: X } = this.slider.getBoundingClientRect();
    const { x } = this.slide.getBoundingClientRect();
    const slidesTotal = Math.round(
      this.slide.offsetWidth / this.slider.offsetWidth,
    );
    if (slidesTotal === 1)
      return (this.slide.style.transform = 'translateX(0)');
    const slided = Math.round((X - x) / this.slider.offsetWidth);
    this.indicators.length &&
      this.indicators.forEach(el => el.classList.remove('active'));
    return { X, x, slidesTotal, slided };
  }

  slideLeft() {
    const { slidesTotal, slided } = this.beforeSlide();
    if (!slidesTotal) return;
    if (slided + 1 === slidesTotal) {
      this.slide.style.transform = 'translateX(0)';
    } else
      this.slide.style.transform = `translateX(-${
        (slided + 1) * this.slider.offsetWidth
      }px)`;
    this.index = slided + 1;
    if (this.indicators.length && this.index === this.indicators.length)
      this.index = 0;
    this.indicators.length &&
      this.indicators[this.index].classList.add('active');
  }

  slideRight() {
    const { x, X, slidesTotal, slided } = this.beforeSlide();
    if (!slidesTotal) return;
    if (-slided + 1 === slidesTotal) return;
    if (x === X)
      this.slide.style.transform = `translateX(-${
        this.slide.offsetWidth - this.slider.offsetWidth
      }px)`;
    else
      this.slide.style.transform = `translateX(${
        (-slided + 1) * this.slider.offsetWidth
      }px)`;
    this.index = slided - 1;
    if (this.index === -1) this.index = this.indicators.length - 1;
    this.indicators[this.index].classList.add('active');
  }

  desideEvent(event) {
    if (this.timer) {
      this.clear();
      if (event.detail.dir === 'left') {
        this.slideLeft();
      }
      if (event.detail.dir === 'right') {
        this.slideRight();
      }
    }
  }
}

const swiper = new Swiper(
  'advantages-slider',
  'advantages-slide',
  '.advantage',
);

export default addSwipeEvent;

export { swiper };
