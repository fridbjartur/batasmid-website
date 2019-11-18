import { TweenMax, TimelineMax } from 'gsap';
import ScrollMagic from 'ScrollMagic';

import navigation from './components/navigation';

if (module.hot) {
  module.hot.accept();
}

navigation();

const sliderWrapper = document.querySelectorAll('.slider-wrapper');

// Init ScrollMagic
const controller = new ScrollMagic.Controller();

// create scene for every slide
for (let i = 0; i < sliderWrapper.length; i++) {
  if (i !== 0 && i < sliderWrapper.length - 1) {
    tweens = new TimelineMax()
      .add(
        TweenMax.fromTo(
          sliderWrapper[i].querySelector('.slider-item-right'),
          2,
          { x: '65vw', opacity: 0 },
          { x: '0vw', opacity: 1 }
        ),
        'first'
      )
      .add(
        TweenMax.fromTo(
          sliderWrapper[i].querySelector('.slider-item-left'),
          2,
          { x: '-65vw', opacity: 0 },
          { x: '0vw', opacity: 1 }
        ),
        'first'
      )
      .add(
        TweenMax.to(sliderWrapper[i].querySelector('.slider-item-right'), 2, {
          x: '-65vw',
          opacity: 0
        }),
        'second'
      )
      .add(
        TweenMax.to(sliderWrapper[i].querySelector('.slider-item-left'), 2, {
          x: '65vw',
          opacity: 0
        }),
        'second'
      );
  } else if (i == sliderWrapper.length - 1) {
    tweens = new TimelineMax()
      .add(
        TweenMax.fromTo(
          sliderWrapper[i].querySelector('.slider-item-right'),
          2,
          { x: '65vw', opacity: 0 },
          { x: '0vw', opacity: 1 }
        ),
        'first'
      )
      .add(
        TweenMax.fromTo(
          sliderWrapper[i].querySelector('.slider-item-left'),
          2,
          { x: '-65vw', opacity: 0 },
          { x: '0vw', opacity: 1 }
        ),
        'first'
      );
  } else {
    tweens = new TimelineMax()
      .add(
        TweenMax.to(sliderWrapper[i].querySelector('.slider-item-right'), 2, {
          x: '-65vw',
          opacity: 0
        }),
        'first'
      )
      .add(
        TweenMax.to(sliderWrapper[i].querySelector('.slider-item-left'), 2, {
          x: '65vw',
          opacity: 0
        }),
        'first'
      );
  }

  new ScrollMagic.Scene({
    triggerElement: sliderWrapper[i],
    triggerHook: 0,
    duration: '100%'
  })
    .setPin(sliderWrapper[i], { pushFollowers: false })
    .setTween(tweens)
    // .addIndicators()
    .addTo(controller);
}
