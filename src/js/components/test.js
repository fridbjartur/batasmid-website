import navigation from './components/navigation';

if (module.hot) {
  module.hot.accept();
}

navigation();


// const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
const sections = document.querySelectorAll('section');


// Init ScrollMagic
const controller = new ScrollMagic.Controller();

// create scene for every slide
const sliderWrapper = document.querySelectorAll('.slider-wrapper');
for (let i = 0; i < sliderWrapper.length; i += 1) {
  const tweens = new TimelineMax();
  if (i !== 0 && i < sliderWrapper.length - 1) {
    tweens
      .add(TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: '65vw', opacity: 0 }, { x: '0vw', opacity: 1 }), 'first')
      .add(TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: '-65vw', opacity: 0 }, { x: '0vw', opacity: 1 }), 'first')
      .add(TweenMax.to(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: '-65vw', opacity: 0 }), 'second')
      .add(TweenMax.to(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: '65vw', opacity: 0 }), 'second');
  } else if (i == sliderWrapper.length - 1) {
    tweens
      .add(TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: '65vw', opacity: 0 }, { x: '0vw', opacity: 1 }), 'first')
      .add(TweenMax.fromTo(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: '-65vw', opacity: 0 }, { x: '0vw', opacity: 1 }), 'first');
  } else {
    tweens
      .add(TweenMax.to(sliderWrapper[i].querySelector('.slider-item-right'), 2, { x: '-65vw', opacity: 0 }), 'first')
      .add(TweenMax.to(sliderWrapper[i].querySelector('.slider-item-left'), 2, { x: '65vw', opacity: 0 }), 'first');
  }


  new ScrollMagic.Scene({ triggerElement: sliderWrapper[i], triggerHook: 0, duration: '100%' })
    .setPin(sliderWrapper[i], { pushFollowers: false })
    .setTween(tweens)
    .setClassToggle(sliderWrapper[i], 'top-index')
    .addTo(controller);
}

function progressIndicator() {
  const durationHeight = document.querySelector('main').scrollHeight;
  new ScrollMagic.Scene({ triggerElement: 'main', triggerHook: 0, duration: durationHeight })
    .setTween('.progress-ring__circle_scroll', 1, { strokeDashoffset: '0' })
    .addTo(controller);

  document.querySelector('#progress-indicator').addEventListener('click', () => {
    TweenMax.to(window, 0.5, { scrollTo: 0 });
  });
}

progressIndicator();


// document.querySelector('.parallax-bg').addEventListener('mouseover', () => {
//   const xSlide = event.clientX / 2;
//   const ySlide = event.clientY * 0.1;

//   TweenLite.to('#sea-bg', 0.5, { x: -xSlide, y: -ySlide });
// });

const sliderTl = new TimelineMax();
const sliderTween2 = TweenMax.fromTo('.gradient-fade', 0.5, { opacity: 0 }, { opacity: 1 });
const sliderTween1 = TweenMax.fromTo('#sea-lines', 0.5, { opacity: 0 }, { opacity: 0.2 });
const sliderTween3 = TweenMax.to('.gradient-fade', 0.5, { opacity: 0 });
const sliderTween4 = TweenMax.to('#sea-lines', 0.5, { opacity: 0 });
const sliderTween5 = TweenMax.to('#sea-bg', 0.5, { x: '20%' });
const sliderTween6 = TweenMax.to('#sea-bg', 0.5, { x: '40%' });

sliderTl.add(sliderTween1, 'first').add(sliderTween2, 'first').add(sliderTween3, 'second').add(sliderTween4, 'second')
  .add(sliderTween5, 'first')
  .add(sliderTween6, 'second');

new ScrollMagic.Scene({ triggerElement: sections[1], triggerHook: 0, duration: '1200%' })
  .setTween(sliderTl)
  .addIndicators()
  .addTo(controller);
