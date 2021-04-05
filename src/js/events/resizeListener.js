import { opts, starsResize } from '../utils/stars';
import { resizeServices, fixSVG } from '../utils/preload';
import RangeInput from '../pages/calc';

const moveThumb = RangeInput.moveThumbInClass();
let timer = null;

export default function listenResize(event) {
  if (opts.canvas) starsResize();
  if (document.querySelector('#services')) resizeServices();
  if (document.querySelector('#hero_slider')) {
    clearTimeout(timer);
    timer = setTimeout(() => fixSVG(), 250);
  }
  if (document.querySelector('#calc')) {
    const rangeSet = document.querySelectorAll('.range');
    rangeSet.forEach(range => moveThumb(range));
  }
}
