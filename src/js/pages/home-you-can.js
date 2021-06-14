import youCan1 from '../../img/you-can1.svg';
import youCan2 from '../../img/you-can2.svg';
import youCan3 from '../../img/you-can3.svg';
import youCan4 from '../../img/you-can4.svg';
import youCan5 from '../../img/you-can5.svg';

function drawHomeYouCanImages () {
  let images = [youCan1, youCan2, youCan3, youCan4, youCan5];
  let speed = [9, 6, 5, 4, 7];
  let nodes = document.querySelectorAll('.home-you-can__image');
  nodes.forEach((node, index) => {
    node.src = `${images[index]}`;
    node.style.animation = `${speed[index]}s linear 0s normal none infinite running rot`;
});

}

export {drawHomeYouCanImages};


