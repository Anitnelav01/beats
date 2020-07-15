/*Слайдер */
const slider = $('.slider__content-slider').bxSlider({
  pager: false,
  controls: false
});

$(".slider__arrow--next ").click((e) => {
  e.preventDefault();
  slider.goToNextSlide();
});


$(".slider__arrow--prev").click((e) => {
  e.preventDefault();
  slider.goToPrevSlide();
});


