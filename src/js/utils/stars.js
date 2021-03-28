const opts = {
  delay: 90,
  step: 0.1,
  minRadius: 0.5,
  maxRadius: 1.4,
  colors: [
    'rgba(255, 255, 255, 0.7)',
    'rgba(252, 244, 201, 0.7)',
    'rgba(201, 252, 201, 0.7)',
    'rgba(201, 236, 252, 0.7)',
    'rgba(229, 201, 252, 0.7)',
    'rgba(252, 201, 201, 0.7)',
    'rgba(252, 201, 241, 0.7)',
    'rgba(252, 201, 201, 0.7)',
  ],
  get canvas() {
    return document.querySelector('#bdCanvas');
  },
};

let check;
let w;
let h;
let animations;
let ctx;

function resizeCanvas() {
  w = opts.canvas.width = window.innerWidth;
  h = opts.canvas.height = window.innerHeight;
}

function starsResize() {
  check = setTimeout(function () {
    clearInterval(animations);
    stars.clearStars();
    resizeCanvas();
    stars.setup();
  }, 100);
}

class Stars {
  constructor() {
    this.arr = [];
  }
  get x() {
    return Math.random() * w;
  }
  get y() {
    return Math.random() * h;
  }
  get radius() {
    return Number(
      (
        opts.minRadius +
        Math.random() * (opts.maxRadius - opts.minRadius)
      ).toFixed(1),
    );
  }
  get color() {
    return opts.colors[[Math.round(Math.random() * opts.colors.length)]];
  }
  get vector() {
    return Math.round(Math.random()) || -1;
  }
  draw(X, Y, Rad, Col, Vec, index) {
    const x = X || this.x;
    const y = Y || this.y;
    const radius = Rad || this.radius;
    const color = Col || this.color;
    const vector = Vec || this.vector;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    const result = { x, y, radius, color, vector };
    if (this.arr[index]) this.arr[index] = result;
    else this.arr.push(result);
  }
  update({ x, y, radius, color, vector }, index) {
    const vec = this.check(radius, vector);
    radius += opts.step * vec;
    this.draw(x, y, radius, color, vec, index);
  }
  check(Rad, Vec) {
    let vec = Vec;
    if (Rad > opts.maxRadius || Rad < opts.minRadius) {
      vec *= -1;
    }
    return vec;
  }
  setup() {
    ctx = opts.canvas.getContext('2d');
    resizeCanvas();
    for (let i = 0; i < (w / 40) * (h / 40); i++) {
      this.draw();
    }
    this.loop();
  }
  loop() {
    animations = setInterval(this.makeLoop.bind(this), opts.delay);
  }
  makeLoop() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < this.arr.length; i++) {
      this.update(this.arr[i], i);
    }
  }
  clearStars() {
    clearTimeout(check);
    clearInterval(animations);
    ctx.clearRect(0, 0, w, h);
    this.arr = [];
  }
}

const stars = new Stars();
export { stars, opts, starsResize };
