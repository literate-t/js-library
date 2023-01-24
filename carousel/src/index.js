import './index.css';
import b1 from '/public/images/1.jpg';
import b2 from '/public/images/2.jpg';
import b3 from '/public/images/3.jpg';
import b4 from '/public/images/4.jpg';

const carousel = ($container, images) => {
  const $carousel = document.getElementById('carousel');
  const $nextButton = document.querySelector('.carousel-button.next');
  const $prevButton = document.querySelector('.carousel-button.prev');

  const DURATION = 500;

  let currentSlide = 0;

  document.addEventListener('DOMContentLoaded', () => {
    const imagesDom = [images[images.length - 1], ...images, images[0]]
      .map((image) => `<li><img src=${image}></img></li>`)
      .join('');

    $carousel.insertAdjacentHTML('afterbegin', imagesDom);
  });

  window.onload = () => {
    const { offsetWidth } = $carousel.querySelector('img');
    $container.style.width = `${offsetWidth}px`;

    move(++currentSlide);
  };

  const move = (current, duration = 0) => {
    $carousel.style.setProperty('--currentSlide', current);
    $carousel.style.setProperty('--duration', duration);
  };

  const handleNextButton = () => {
    move(++currentSlide, DURATION);
  };

  const handlePrevButton = () => {
    move(--currentSlide, DURATION);
  };

  const handleTransitionEnd = () => {
    if (currentSlide === images.length + 1) {
      currentSlide -= images.length;
    } else if (currentSlide === 0) {
      currentSlide += images.length;
    }
    move(currentSlide);
  };

  $carousel.addEventListener('transitionend', handleTransitionEnd);

  $nextButton.addEventListener('click', handleNextButton);

  $prevButton.addEventListener('click', handlePrevButton);
};

carousel(document.getElementById('container'), [b1, b2, b3, b4]);
