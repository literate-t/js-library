import './index.css';
import b1 from '/public/images/1.jpg';
import b2 from '/public/images/2.jpg';
import b3 from '/public/images/3.jpg';
import b4 from '/public/images/4.jpg';

const carousel = ($container, images, title) => {
  const $header = document.querySelector('.header');
  const $carousel = document.getElementById('carousel');
  const $nextButton = document.querySelector('.carousel-button.next');
  const $prevButton = document.querySelector('.carousel-button.prev');
  let $dotLi = null;

  const DURATION = 500;

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

  const handleHeaderClick = ({ target }) => {
    if (!target.dataset.id) {
      return;
    }

    removeActiveFromDots();
    target.classList.add('active');

    const { id } = target.dataset;
    currentSlide = id;

    move(id, DURATION);
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

    removeActiveFromDots();
    const index = currentSlide < 5 ? currentSlide : 1;
    $dotLi[index - 1].classList.add('active');
  };

  const handlePrevButton = () => {
    move(--currentSlide, DURATION);

    removeActiveFromDots();
    const index = 0 < currentSlide ? currentSlide : 4;
    $dotLi[index - 1].classList.add('active');
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

carousel(document.getElementById('container'), [b1, b2, b3, b4], 'Event');
