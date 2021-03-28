import slider from '../utils/slider';
import { swiper } from '../utils/swiper';

export default function listenSwipes(event) {
  if (event.target.closest('#slider')) slider.changeSlidesOnEvent(event);
  if (event.target.closest('#advantages-slider')) swiper.desideEvent(event);
}
