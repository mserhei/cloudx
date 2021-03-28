import circle from '../../templates/halfCircle.hbs';
import feedbackModal from '../../templates/feedback-modal.hbs';
import errorModal from '../../templates/error-modal.hbs';
import localFeedbackModal from '../localization/localFeedbackModal.json';
import errors from '../localization/errors.json';
import { lang } from '../history/mainHistory';

export default class RangeInput {
  constructor({
    parent,
    output = null,
    units,
    title,
    min = 0,
    max = 100,
    step = 1,
    markers = [0, 20, 40, 60, 80, 100],
    price = 100,
  }) {
    this.parent = parent;
    this.title = title;
    this.output = output;
    this.units = units;
    this.min = min;
    this.max = max;
    this.step = step;
    this.markers = markers;
    this.price = price;
    this.moveThumb = this.constructor.moveThumbInClass();
    this.handleMove = this.handleMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  renderRangeInput() {
    const input = document.createElement('input');
    input.type = 'range';
    input.setAttribute('min', this.min);
    input.setAttribute('max', this.max);
    input.setAttribute('value', this.min);
    input.setAttribute('step', this.step);
    input.dataset.unit = this.units;
    input.dataset.price = this.price;
    input.dataset.value = 0;
    input.classList.add('range__input');
    const result = document.createElement('div');
    result.innerHTML = `<span>${this.min}</span><span>${this.units}</span>`;
    result.setAttribute('value', this.min);
    result.classList.add('range__output');
    const chosen = document.createElement('div');
    const accent = document.createElement('div');
    accent.classList.add('range__accent');
    chosen.classList.add('range__chosen');
    chosen.appendChild(accent);
    const markersSet = this.drawMarkers();
    const frag = document.createDocumentFragment();
    frag.appendChild(input);
    frag.appendChild(chosen);
    frag.appendChild(result);
    frag.appendChild(markersSet);
    const wrapper = document.createElement('div');
    wrapper.classList.add('range__wrapper');
    wrapper.appendChild(frag);
    const mainWrapper = document.createElement('div');
    mainWrapper.classList.add('range__wrapper-flex');
    const circleRef = document.createElement('div');
    circleRef.classList.add('range__circle-wrapper');
    circleRef.innerHTML = circle();
    mainWrapper.appendChild(wrapper);
    mainWrapper.appendChild(circleRef);
    this.parent && this.parent.appendChild(mainWrapper);
    const circleInput = this.parent.querySelector('.range__result-input');
    circleInput.setAttribute('data-max', this.max);
    circleInput.setAttribute('data-min', this.min);
    circleInput.setAttribute('data-step', this.step);
    this.parent.addEventListener('input', this.handleMove);
    circleRef.addEventListener('wheel', this.handleScroll);
    this.moveThumb(this.parent);
  }
  static moveThumbInClass() {
    return function (parent) {
      let thumbWidth;
      const deviceWidth = Math.max(
        window.innerWidth,
        document.documentElement.clientWidth,
        document.body.clientWidth,
      );
      if (deviceWidth >= 1280) thumbWidth = 116;
      else if (deviceWidth >= 768) thumbWidth = 94;
      else thumbWidth = 76;
      const result = parent.querySelector('.range__result');
      const arrow = parent.querySelector('.circle__arrow');
      const innerUp = parent.querySelector('.inner.up');
      const innerDown = parent.querySelector('.inner.down');
      const wrapper = parent.children[1].children[0];
      const value = wrapper.children[0].value;
      const price = wrapper.children[0].dataset.price;
      const width = wrapper.children[0].offsetWidth;
      const max = wrapper.children[0].getAttribute('max');
      const resultValue = Math.round((360 * value) / max);
      const unit = wrapper.children[0].dataset.unit;
      const position = Math.round((value * (width - thumbWidth)) / max);
      const markersSet = Array.from(wrapper.children[3].children);
      wrapper.children[1].style.width = position + 'px';
      if (navigator.userAgent.match(/Firefox/i)) {
        let margin;
        if (deviceWidth >= 1280) margin = 12;
        else if (deviceWidth >= 768) margin = 10;
        else margin = 8;
        wrapper.children[0].style.marginTop = `${margin}px`;
      }
      wrapper.children[2].style.transform = `translateX(${position}px)`;
      wrapper.children[2].innerHTML = `<span>${value}</span><span> ${unit}</span>`;
      markersSet.map(marker => {
        marker.classList.remove('shine');
        if (marker.textContent == value) marker.classList.add('shine');
      });
      result.children[0].setAttribute('data-cost', `${value * price}`);
      result.children[0].setAttribute('data-value', `${value}`);
      result.children[0].value = value;
      result.children[1].textContent = unit;
      arrow.style.transform = `rotate(${resultValue}deg)`;
      if (resultValue <= 180) {
        innerUp.style.transform = `rotate(0deg)`;
        innerDown.style.transform = `rotate(${resultValue}deg)`;
      } else {
        innerDown.style.transform = `rotate(180deg)`;
        innerUp.style.transform = `rotate(${resultValue - 180}deg)`;
      }
      let totalResults = 0;
      document
        .querySelectorAll('.range__result')
        .forEach(el => (totalResults += Number(el.children[0].dataset.cost)));
      document
        .querySelectorAll('.calc__sum-value')
        .forEach(el => (el.textContent = `${totalResults.toFixed(2)} BYN`));
    };
  }
  handleScroll(e) {
    e.preventDefault();
    const direction = e.wheelDeltaY > 0 ? 1 : -1;
    const data = Number(
      e.currentTarget.querySelector('.range__result-input').dataset.value,
    );
    const result = data + direction * this.step;
    if (result < this.mix || result > this.max) return;
    this.syncResults(result, null, 0);
  }
  handleMove(e) {
    if (e.target.classList.contains('range__input')) {
      this.moveThumb(this.parent);
    }
    if (e.target.classList.contains('range__result-input')) {
      if (!e.target.value) {
        this.syncResults(0, e.target);
        return;
      }
      let result = 0;
      const value = e.target.value;
      const numberInput =
        value.match(/[0-9]/g) &&
        Math.round(Number(Array.from(value.match(/[0-9]/g)).join('')));
      if (numberInput && numberInput <= this.min) result = this.min;
      else if (numberInput && numberInput >= this.max) result = this.max;
      else if (numberInput)
        result = Math.ceil(numberInput / this.step) * this.step;
      console.log(result);
      this.syncResults(result);
    }
  }
  syncResults(result, target, delay = 1000) {
    clearInterval(this.timeout);
    clearInterval(this.timer);
    const input = this.parent.querySelector('.range__input');
    this.timeout = setTimeout(() => {
      let value = Number(input.value);
      if (value === result) return this.moveThumb(this.parent);
      const index = result > value ? 1 : -1;
      this.timer = setInterval(() => {
        value += index * this.step;
        input.value = value;
        this.moveThumb(this.parent);
        if (input.value == result) clearInterval(this.timer);
        if (
          target === document.activeElement &&
          result == input.dataset.value &&
          !result
        ) {
          target.value = '';
        }
      }, 20);
    }, delay);
  }
  drawMarkers() {
    const markers = document.createElement('div');
    markers.classList.add('range__markers');
    const documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(markers);
    for (let i = 0; i < this.markers.length; i++) {
      const markerVal = document.createElement('span');
      markerVal.classList.add('range__markers-item');
      markerVal.textContent = this.markers[i];
      markers.appendChild(markerVal);
    }
    return documentFragment;
  }
}

function renderCalculator() {
  const specs = [
    {
      parent: document.getElementById('id_cpu'),
      max: 50,
      units: 'Ghz',
      markers: [0, 10, 20, 30, 40, 50],
      price: 9.7,
    },
    {
      parent: document.getElementById('id_ram'),
      units: 'Gb',
      step: 2,
      price: 13.5,
    },
    {
      parent: document.getElementById('id_sas'),
      max: 500,
      units: 'Gb',
      markers: [0, 100, 200, 300, 400, 500],
      step: 10,
      price: 0.2,
    },
    {
      parent: document.getElementById('id_ssd'),
      max: 500,
      units: 'Gb',
      markers: [0, 100, 200, 300, 400, 500],
      step: 10,
      price: 0.7,
    },
    {
      parent: document.getElementById('id_nl-sas'),
      max: 1000,
      units: 'Gb',
      markers: [0, 200, 400, 600, 800, 1000],
      step: 20,
      price: 0.45,
    },
  ];

  for (let spec of specs) {
    const range = new RangeInput(spec);
    range.renderRangeInput();
  }
}

function renderOrder() {
  const markupRaw = JSON.parse(JSON.stringify(localFeedbackModal[lang.name]));

  markupRaw.fields[0].field[0].options[2].selected = 'selected';
  markupRaw.fields[0].field[0].disabled = 'disabled';
  markupRaw.fields[0].field[1].disabled = 'disabled';
  markupRaw.fields[0].field[1].required = '';
  const results = Array.from(document.querySelectorAll('.range'));

  let complited = true;

  const order = results.reduce((acc, el) => {
    const orderName = el.querySelector('.range__title').textContent;
    const orderValue = el.querySelector('.range__output').children;
    if (!Number(orderValue[0].textContent)) complited = false;
    const orderValueVal = `${orderValue[0].textContent} ${orderValue[1].textContent}`;
    acc += `\n${orderName} ${orderValueVal}\n`;
    return acc;
  }, '\n');

  if (!complited) return errorModal(errors[lang.name]);

  markupRaw.fields[0].field[1].text = order;
  const markup = feedbackModal(markupRaw);
  return markup;
}

export { renderCalculator, renderOrder };
