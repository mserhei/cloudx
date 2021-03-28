import { opts, starsResize } from '../utils/stars';
import { resizeServices } from '../utils/preload';
import RangeInput from '../pages/calc';

const moveThumb = RangeInput.moveThumbInClass();

export default function listenResize(event) {
  if (opts.canvas) starsResize();
  if (document.querySelector('#services')) resizeServices();
  if (document.querySelector('#calc')) {
    const rangeSet = document.querySelectorAll('.range');
    rangeSet.forEach(range => moveThumb(range));
  }
}
