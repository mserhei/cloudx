import { lang } from '../history/mainHistory';

export default class CountdownTimer {
  constructor(specs) {
    this.selector = specs.selector;
    this.targetDate = specs.targetDate;
    this.startCountdown();
  }
  createTimer() {
    return new Promise((resolve, reject) => {
      const timerRef = document.querySelector(this.selector);
      timerRef ? resolve(timerRef) : reject('The timer cannot be found by ID');
    });
  }
  parseTimerHTML(timerRef) {
    const timerObj = {
      timerRef,
      titleRef: timerRef.closest('.new-year-timer'),
      valueRef: timerRef.querySelectorAll('.value'),
      labelRef: timerRef.querySelectorAll('.label'),
    };
    return timerObj;
  }
  startTimer({ timerRef, titleRef, valueRef, labelRef }) {
    const intervalSet = setInterval(() => {
      const time = Date.parse(this.targetDate) - Date.now();
      const clock = document.querySelector(`${this.selector}-clock`);

      valueRef[0].textContent = Math.floor(time / (1000 * 60 * 60 * 24));
      valueRef[1].textContent = Math.floor(
        (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      valueRef[2].textContent = Math.floor(
        (time % (1000 * 60 * 60)) / (1000 * 60),
      );
      valueRef[3].textContent = Math.floor((time % (1000 * 60)) / 1000);
      if (clock) {
        if (valueRef[3].textContent == 0) clock.style.transition = 'none';
        if (valueRef[3].textContent == 58) clock.style.transition = '';
        clock.style.transform = `rotate(${valueRef[3].textContent * 6}deg)`;
      }

      if (lang.name === 'en') {
        labelRef[0].textContent = valueRef[0].textContent == 1 ? 'day' : 'days';
        labelRef[1].textContent =
          valueRef[1].textContent == 1 ? 'hour' : 'hours';
        labelRef[2].textContent =
          valueRef[2].textContent == 1 ? 'minute' : 'minutes';
        labelRef[3].textContent =
          valueRef[3].textContent == 1 ? 'second' : 'seconds';
      }
      if (lang.name === 'ru') {
        labelRef[0].textContent = this.getStringValue(
          0,
          valueRef[0].textContent,
        );
        labelRef[1].textContent = this.getStringValue(
          1,
          valueRef[1].textContent,
        );
        labelRef[2].textContent = this.getStringValue(
          2,
          valueRef[2].textContent,
        );
        labelRef[3].textContent = this.getStringValue(
          3,
          valueRef[3].textContent,
        );
      }

      if (time == 0) {
        clearInterval(intervalSet);
        titleRef.textContent = 'Hooooray!!!';
        titleRef.style.fontSize = '50px';
      }
    }, 1000);

    // timerRef.addEventListener('DOMSubtreeModified', this.animateTimer);
  }
  getStringValue(str, val) {
    const words = [
      ['день', 'дня', 'дней'],
      ['час', 'часа', 'часов'],
      ['минуту', 'минуты', 'минут'],
      ['секунду', 'секунды', 'секунд'],
    ];
    const word = words[str];
    let result = word[1];
    if (val.slice(-1) == 1) {
      result = word[0];
    }
    if ((val < 21 && val > 9) || val.slice(-1) > 4 || val.slice(-1) == 0) {
      result = word[2];
    }
    return result;
  }
  animateTimer({ target }) {
    if (target.classList.contains('value')) {
      target.insertAdjacentHTML(
        'afterEnd',
        `<span class="value after">${target.textContent}</span>`,
      );
      setTimeout(() => {
        target.nextSibling.classList.add('trans');
      }, 200);
      setTimeout(() => {
        target.nextSibling.remove();
      }, 900);
    }
  }
  startCountdown() {
    return this.createTimer()
      .then(this.parseTimerHTML)
      .then(this.startTimer.bind(this))
      .catch(err => {
        console.warn(err);
      });
  }
}
