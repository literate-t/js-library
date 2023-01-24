import './index.css';
import b1 from '/public/images/1.jpg';
import b2 from '/public/images/2.jpg';
import b3 from '/public/images/3.jpg';
import b4 from '/public/images/4.jpg';

const carousel = ($container, images, title, isAutoPlay, playTime = 3000) => {
  const $header = document.querySelector('.header');
  const $carousel = document.getElementById('carousel');
  const $nextButton = document.querySelector('.carousel-button.next');
  const $prevButton = document.querySelector('.carousel-button.prev');

  let $dotLi = null;
  let timerId = null;

  const DURATION = 500;
  const NEXT = 1;
  const PREV = -1;

  let currentSlide = 0;

  const makeHeader = () => {
    const headerTitle = `<h1>${title}</h1>`;
    const dots = `<ul class="dots">${images
      .map(
        (_, index) =>
          `<li><button type="button" class="dot" data-id=${
            index + 1
          }></button></li>`
      )
      .join('')}</ul>`;

    $header.insertAdjacentHTML('beforeend', headerTitle);
    $header.insertAdjacentHTML('beforeend', dots);
  };

  const removeActiveFromDots = () => {
    for (let i = 0; i < $dotLi.length; ++i) {
      $dotLi[i].classList.remove('active');
    }
  };

  const handleHeaderClick = (event) => {
    if (isAutoPlay) {
      return;
    }

    event.stopPropagation();

    const { target } = event;

    if (!target.dataset.id) {
      return;
    }

    removeActiveFromDots();
    target.classList.add('active');

    const { id } = target.dataset;
    currentSlide = +id;

    move(currentSlide, DURATION);
  };

  $header.addEventListener('click', handleHeaderClick);

  const getDotLiElement = () => {
    $dotLi = $header.querySelectorAll('.dot');
    $dotLi[0].classList.add('active');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const imagesDom = [images[images.length - 1], ...images, images[0]]
      .map((image) => `<li><img src=${image}></img></li>`)
      .join('');

    $carousel.insertAdjacentHTML('afterbegin', imagesDom);

    makeHeader();

    getDotLiElement();
  });

  const autoPlay = () => {
    setMove(NEXT, DURATION);
    timerId = setTimeout(autoPlay, playTime);
  };

  window.onload = () => {
    const { offsetWidth } = $carousel.querySelector('img');
    $container.style.width = `${offsetWidth}px`;

    move(++currentSlide);

    if (isAutoPlay) {
      setTimeout(autoPlay, playTime);
    }
  };

  const move = (current, duration = 0) => {
    $carousel.style.setProperty('--currentSlide', current);
    $carousel.style.setProperty('--duration', duration);
  };

  const addActiveClassToDot = (index) => {
    $dotLi[index - 1].classList.add('active');
  };

  const getActiveClassIndex = (flag) => {
    // next
    if (flag === 1) {
      return currentSlide < images.length + 1 ? currentSlide : 1;
    }

    return 0 < currentSlide ? currentSlide : images.length;
  };

  const setMove = (step, duration = 0) => {
    currentSlide = currentSlide + step;
    console.log({ currentSlide });

    move(currentSlide, duration);

    removeActiveFromDots();

    const index = getActiveClassIndex(step);
    addActiveClassToDot(index);
  };

  const handleButton = ({ target }) => {
    if (!target.classList.contains('carousel-button') || isAutoPlay) {
      return;
    }

    const step = target.classList.contains('next') ? NEXT : PREV;

    setMove(step, DURATION);
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

  $container.addEventListener('click', handleButton);
};

carousel(
  document.getElementById('container'),
  [b1, b2, b3, b4],
  'Event',
  false
);
